/* Browser runtime for the recovered GameMaker 1.x resources and GML events. */
(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d', { alpha: false });
  const errorBox = document.getElementById('error');
  const progress = document.getElementById('progress');
  const constants = {
    vk_left: 37, vk_up: 38, vk_right: 39, vk_down: 40, vk_shift: 16,
    vk_enter: 13, vk_space: 32, vk_escape: 27,
    c_black: 0, c_white: 0xffffff, c_red: 255, c_lime: 65280,
    c_gray: 8421504, c_blue: 16711680, noone: -4, all: -3
  };
  const rgb = color => `rgb(${color & 255},${(color >>> 8) & 255},${(color >>> 16) & 255})`;
  const numeric = value => Number(value);
  const clone = value => JSON.parse(JSON.stringify(value));
  const held = new Set(), pressed = new Set(), released = new Set();
  let audio, game, failed = false;
  async function loadAssets(items, load) {
    const result = Array(items.length);
    let next = 0;
    await Promise.all(Array.from({ length: Math.min(4, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        result[index] = await load(items[index], index);
      }
    }));
    return result;
  }
  function fail(error) {
    if (failed) return;
    failed = true;
    console.error(error);
    document.getElementById('loader').hidden = true;
    document.getElementById('loader').style.display = 'none';
    errorBox.textContent = `Unable to start Mario.EXE.\n${error.message || error}`;
    errorBox.hidden = false;
  }
  class Sound {
    constructor(data) {
      this.data = data;
      this.context = new AudioContext();
      this.voices = new Map();
      this.serial = 1000;
      this.buffers = [];
      this.unlocked = false;
    }
    async load(tick) {
      await loadAssets(this.data, async (sound, id) => {
        const response = await fetch(sound.file, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Audio file missing: ${sound.file}`);
        this.buffers[id] = await this.context.decodeAudioData(await response.arrayBuffer());
        tick();
      });
    }
    async unlock() {
      await this.context.resume();
      this.unlocked = this.context.state === 'running';
      if (this.unlocked) for (const voice of this.voices.values()) if (!voice.source) this.start(voice);
    }
    start(voice) {
      const source = this.context.createBufferSource();
      source.buffer = this.buffers[voice.sound];
      source.loop = voice.loop;
      const gain = this.context.createGain();
      gain.gain.value = this.data[voice.sound].volume;
      source.connect(gain).connect(this.context.destination);
      voice.source = source;
      voice.started = this.context.currentTime;
      source.onended = () => { gain.disconnect(); this.voices.delete(voice.id); };
      source.start();
    }
    play(sound, loop) {
      sound = numeric(sound);
      if (!this.buffers[sound]) throw new Error(`Unknown sound ${sound}`);
      if (this.voices.size >= 32) this.stop(this.voices.keys().next().value);
      const voice = { id: this.serial++, sound, loop: !!loop, source: null };
      this.voices.set(voice.id, voice);
      if (this.unlocked && this.context.state === 'running') this.start(voice);
      return voice.id;
    }
    stop(value) {
      value = numeric(value);
      for (const voice of [...this.voices.values()]) if (voice.sound === value || voice.id === value) {
        if (voice.source) voice.source.stop();
        this.voices.delete(voice.id);
      }
    }
    stopAll() { for (const voice of [...this.voices.values()]) this.stop(voice.id); }
    playing(value) { return [...this.voices.values()].some(v => v.sound === numeric(value) || v.id === numeric(value)); }
  }
  class Game {
    constructor(data, textures) {
      this.data = data;
      this.textures = textures;
      this.instances = [];
      this.byObject = data.objects.map(() => []);
      this.selectors = data.objects.map((_, i) => this.selector(i));
      this.assets = { ...constants };
      for (const kind of ['sprites', 'backgrounds', 'rooms', 'sounds', 'fonts', 'timelines'])
        data[kind].forEach((asset, i) => { this.assets[asset.name || asset.Name] = i; });
      data.objects.forEach((o, i) => { this.assets[o.name] = this.selectors[i]; });
      this.functions = window.MARIO_EVENTS;
      this.serial = 200000;
      this.pendingRoom = null;
      this.frame = 0;
      this.drawColor = 0xffffff;
      this.drawAlpha = 1;
      this.drawFont = 0;
      this.particles = [];
      this.staticGrid = new Map();
      this.dynamics = [];
      this.gridDirty = true;
      this.eventLog = [];
      this.goto(data.roomOrder[0]);
    }
    selector(id) {
      return new Proxy({}, {
        get: (_, key) => {
          if (key === Symbol.toPrimitive) return () => id;
          if (key === '__object') return id;
          const target = this.byObject[id]?.find(i => !i.dead);
          return target ? this.read(target, key) : 0;
        },
        set: (_, key, value) => {
          for (const target of this.byObject[id] || []) if (!target.dead) this.write(target, key, value);
          return true;
        }
      });
    }
    select(value) {
      if (value && typeof value === 'object' && value.__instance) return value.__instance.dead ? [] : [value.__instance];
      if (value && typeof value === 'object' && value.object_index !== undefined && value.id >= 100000) return value.dead ? [] : [value];
      const id = numeric(value);
      if (id === -3) return this.instances.filter(i => !i.dead);
      if (id >= 100000) return this.instances.filter(i => !i.dead && i.id === id);
      return (this.byObject[id] || []).filter(i => !i.dead);
    }
    instanceProxy(instance) {
      if (!instance) return -4;
      return new Proxy({}, {
        get: (_, key) => key === '__instance' ? instance : key === Symbol.toPrimitive ? () => instance.id : this.read(instance, key),
        set: (_, key, value) => { this.write(instance, key, value); return true; }
      });
    }
    scope(instance, other) {
      if (other === instance && instance.__scope) return instance.__scope;
      const localFunctions = this.builtins(instance, other);
      const scope = new Proxy({}, {
        has: (_, key) => typeof key === 'string' && !key.startsWith('__'),
        get: (_, key) => {
          if (key === Symbol.unscopables) return undefined;
          if (key === 'self') return instance;
          if (key === 'other') return this.instanceProxy(other);
          if (key in localFunctions) return localFunctions[key];
          if (key in this.assets) return this.assets[key];
          return this.read(instance, key);
        },
        set: (_, key, value) => { this.write(instance, key, value); return true; }
      });
      if (other === instance) instance.__scope = scope;
      return scope;
    }
    read(instance, key) {
      const global = {
        room: this.room, room_width: this.roomData.width, room_height: this.roomData.height,
        room_speed: this.speed, background_color: this.backgroundColor,
        background_index: this.backgroundIndex,
        view_visible: this.viewVisible, view_xview: this.viewX, view_yview: this.viewY,
        view_current: this.viewCurrent || 0
      };
      if (key in global) return global[key];
      if (key === 'sprite_width') return this.data.sprites[instance.sprite_index]?.width || 0;
      if (key === 'sprite_height') return this.data.sprites[instance.sprite_index]?.height || 0;
      if (key === 'image_number') return this.data.sprites[instance.sprite_index]?.frames.length || 0;
      if (key === 'direction') return (Math.atan2(-instance.vspeed, instance.hspeed) * 180 / Math.PI + 360) % 360;
      if (key === 'speed') return Math.hypot(instance.hspeed, instance.vspeed);
      return instance[key] ?? 0;
    }
    write(instance, key, value) {
      if (key === 'room') { this.pendingRoom = numeric(value); return; }
      if (key === 'room_speed') { this.speed = Math.max(1, numeric(value)); return; }
      if (key === 'background_color') { this.backgroundColor = numeric(value); return; }
      if (key === 'direction') {
        const speed = Math.hypot(instance.hspeed, instance.vspeed), rad = numeric(value) * Math.PI / 180;
        instance.hspeed = Math.cos(rad) * speed; instance.vspeed = -Math.sin(rad) * speed; return;
      }
      if ((key === 'x' || key === 'y') && !instance.dynamic) this.gridDirty = true;
      if ((key === 'hspeed' || key === 'vspeed' || key === 'gravity') && value && !instance.dynamic) {
        instance.dynamic = true; this.dynamics.push(instance); this.gridDirty = true;
      }
      instance[key] = value;
    }
    run(code, instance, other) {
      if (code < 0 || !this.functions[code]) return;
      try {
        this.functions[code]((i, o) => this.scope(i, o), value => this.select(value), instance, other || instance);
      } catch (error) {
        error.message = `${this.data.codeNames[code]}: ${error.message}`;
        throw error;
      }
    }
    event(instance, type, subtype = 0, other = null) {
      const object = this.data.objects[instance.object_index];
      const found = object.events[type]?.find(e => e[0] === subtype);
      if (found) for (const code of found[1]) this.run(code, instance, other);
      else if (object.parent >= 0) {
        const parent = this.data.objects[object.parent].events[type]?.find(e => e[0] === subtype);
        if (parent) for (const code of parent[1]) this.run(code, instance, other);
      }
      return !!found;
    }
    create(x, y, objectIndex, placed) {
      objectIndex = numeric(objectIndex);
      const object = this.data.objects[objectIndex];
      if (!object) throw new Error(`Unknown object ${objectIndex}`);
      const instance = {
        id: placed ? placed[1] : this.serial++, object_index: objectIndex,
        x, y, xprevious: x, yprevious: y, hspeed: 0, vspeed: 0,
        gravity: 0, gravity_direction: 270, friction: 0,
        sprite_index: object.sprite, mask_index: object.mask,
        visible: object.visible, solid: object.solid, persistent: object.persistent,
        depth: object.depth, image_index: 0, image_speed: 1,
        image_xscale: placed ? placed[4] : 1, image_yscale: placed ? placed[5] : 1,
        image_blend: placed ? placed[6] & 0xffffff : 0xffffff,
        image_alpha: placed ? (placed[6] >>> 24) / 255 : 1,
        image_angle: placed ? placed[7] : 0,
        alarm: Array(12).fill(-1), timeline_index: -1, timeline_position: 0,
        timeline_speed: 1, timeline_running: false, timeline_loop: false,
        act: [], dead: false,
        dynamic: object.events.some((es, type) => type !== 0 && type !== 8 && es.length) || object.name === 'obj_princess'
      };
      this.instances.push(instance);
      this.byObject[objectIndex].push(instance);
      if (instance.dynamic) this.dynamics.push(instance);
      this.gridDirty = true;
      this.event(instance, 0);
      if (placed && placed[8] >= 0) this.run(placed[8], instance);
      return instance.id;
    }
    destroy(instance) {
      if (!instance || instance.dead) return;
      this.event(instance, 1);
      instance.dead = true;
      this.gridDirty = true;
    }
    goto(room) {
      room = numeric(room);
      if (!this.data.rooms[room]) throw new Error(`Unknown room ${room}`);
      if (this.roomData) for (const instance of this.instances) if (!instance.dead) this.event(instance, 7, 5);
      this.instances = this.instances.filter(i => !i.dead && i.persistent);
      this.byObject = this.data.objects.map(() => []);
      for (const instance of this.instances) this.byObject[instance.object_index].push(instance);
      this.dynamics = this.instances.filter(i => i.dynamic);
      this.room = room;
      this.roomData = this.data.rooms[room];
      this.speed = this.roomData.speed;
      this.backgroundColor = this.roomData.color;
      this.backgrounds = clone(this.roomData.backgrounds);
      this.backgroundIndex = this.backgrounds.map(b => b.index);
      this.views = clone(this.roomData.views);
      this.viewVisible = this.views.map(v => v.enabled);
      this.viewX = this.views.map(v => v.x);
      this.viewY = this.views.map(v => v.y);
      this.pendingRoom = null;
      this.particles = [];
      const existingIDs = new Set(this.instances.map(i => i.id));
      for (const placed of this.roomData.instances) if (!existingIDs.has(placed[1])) this.create(placed[2], placed[3], placed[0], placed);
      const controller = this.instances[0] || { act: [], alarm: [] };
      this.run(this.roomData.code, controller);
      for (const instance of [...this.instances]) if (!instance.dead) this.event(instance, 7, 4);
      this.gridDirty = true;
      this.eventLog.push({ frame: this.frame, room: this.roomData.name });
    }
    nextRoom() {
      const position = this.data.roomOrder.indexOf(this.room);
      this.pendingRoom = this.data.roomOrder[position + 1] ?? this.data.roomOrder[0];
    }
    bbox(instance, x = instance.x, y = instance.y) {
      const sprite = this.data.sprites[instance.mask_index >= 0 ? instance.mask_index : instance.sprite_index];
      if (!sprite) return null;
      const [left, top, right, bottom] = sprite.bbox;
      const [ox, oy] = sprite.origin;
      const xa = (left - ox) * instance.image_xscale, xb = (right + 1 - ox) * instance.image_xscale;
      const ya = (top - oy) * instance.image_yscale, yb = (bottom + 1 - oy) * instance.image_yscale;
      if (instance.image_angle) {
        const radians = instance.image_angle * Math.PI / 180;
        const clean = value => Math.abs(value) < 1e-12 ? 0 : value;
        const c = clean(Math.cos(radians)), s = clean(Math.sin(radians));
        // Enclose the transformed mask, using the same rotation as sprite drawing.
        return [
          x + Math.min(c * xa, c * xb) + Math.min(s * ya, s * yb),
          y + Math.min(c * ya, c * yb) - Math.max(s * xa, s * xb),
          x + Math.max(c * xa, c * xb) + Math.max(s * ya, s * yb),
          y + Math.max(c * ya, c * yb) - Math.min(s * xa, s * xb)
        ];
      }
      return [x + Math.min(xa, xb), y + Math.min(ya, yb), x + Math.max(xa, xb), y + Math.max(ya, yb)];
    }
    overlap(a, b) { return a && b && a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1]; }
    rebuildGrid() {
      this.staticGrid.clear();
      for (const instance of this.instances) if (!instance.dead && !instance.dynamic) {
        const box = this.bbox(instance);
        if (!box) continue;
        for (let x = Math.floor(box[0] / 128); x <= Math.floor(box[2] / 128); x++)
          for (let y = Math.floor(box[1] / 128); y <= Math.floor(box[3] / 128); y++) {
            const key = `${x},${y}`;
            if (!this.staticGrid.has(key)) this.staticGrid.set(key, []);
            this.staticGrid.get(key).push(instance);
          }
      }
      this.gridDirty = false;
    }
    nearby(box) {
      if (this.gridDirty) this.rebuildGrid();
      const found = new Set(this.dynamics.filter(i => !i.dead));
      if (box) for (let x = Math.floor(box[0] / 128); x <= Math.floor(box[2] / 128); x++)
        for (let y = Math.floor(box[1] / 128); y <= Math.floor(box[3] / 128); y++)
          for (const instance of this.staticGrid.get(`${x},${y}`) || []) if (!instance.dead) found.add(instance);
      return found;
    }
    meeting(instance, x, y, selector, solids = false) {
      const box = this.bbox(instance, x, y);
      if (!box) return false;
      let target = selector === undefined ? null : numeric(selector);
      for (const candidate of this.nearby(box)) {
        if (candidate === instance || candidate.dead || (solids && !candidate.solid)) continue;
        if (target !== null && target !== -3 && (target >= 100000 ? candidate.id !== target : candidate.object_index !== target)) continue;
        if (this.overlap(box, this.bbox(candidate))) return true;
      }
      return false;
    }
    contact(instance, direction, maxDistance) {
      const rad = direction * Math.PI / 180;
      const dx = Math.cos(rad), dy = -Math.sin(rad);
      for (let step = 0; step < maxDistance; step++) {
        if (this.meeting(instance, instance.x + dx, instance.y + dy, undefined, true)) break;
        instance.x += dx; instance.y += dy;
      }
    }
    builtins(instance, other) {
      const play = (sound, priority, loop) => audio.play(sound, loop);
      return {
        keyboard_check: key => held.has(numeric(key)),
        keyboard_check_pressed: key => pressed.has(numeric(key)),
        keyboard_check_released: key => released.has(numeric(key)),
        place_free: (x, y) => !this.meeting(instance, x, y, undefined, true),
        place_meeting: (x, y, selector) => this.meeting(instance, x, y, selector),
        move_contact_solid: (direction, distance) => this.contact(instance, direction, distance),
        instance_create: (x, y, object) => this.create(x, y, object),
        instance_destroy: () => this.destroy(instance),
        room_goto: room => { this.pendingRoom = numeric(room); },
        room_goto_next: () => this.nextRoom(),
        audio_play_sound: play, audio_stop_sound: sound => audio.stop(sound),
        audio_stop_all: () => audio.stopAll(), sound_stop_all: () => audio.stopAll(),
        audio_is_playing: sound => audio.playing(sound),
        random: max => Math.random() * max, irandom: max => Math.floor(Math.random() * (max + 1)),
        choose: (...values) => values[Math.floor(Math.random() * values.length)],
        action_if: value => !!value,
        action_if_variable: (a, b, comparison) => [a === b, a < b, a > b, a <= b, a >= b, a !== b][comparison],
        action_if_life: (life, comparison) => [0 === life, 0 < life, 0 > life][comparison],
        action_if_sound: sound => audio.playing(sound),
        action_kill_object: () => this.destroy(instance),
        action_create_object: (object, x, y) => this.create(x, y, object),
        action_sound: (sound, loop) => play(sound, 1, loop),
        action_end_sound: sound => audio.stop(sound),
        action_set_hspeed: speed => { this.write(instance, 'hspeed', speed); },
        action_set_vspeed: speed => { this.write(instance, 'vspeed', speed); },
        action_set_alarm: (value, alarm) => { instance.alarm[alarm] = value; },
        action_set_cursor: () => { canvas.style.cursor = 'none'; },
        action_next_room: () => this.nextRoom(),
        action_another_room: room => { this.pendingRoom = numeric(room); },
        action_restart_game: () => { audio.stopAll(); for (const i of this.instances) i.persistent = false; this.pendingRoom = this.data.roomOrder[0]; },
        action_sprite_set: (sprite, image, speed) => { instance.sprite_index = numeric(sprite); if (image >= 0) instance.image_index = image; instance.image_speed = speed; },
        action_timeline_set: (timeline, position, speed, loop) => {
          instance.timeline_index = timeline; instance.timeline_position = position;
          instance.timeline_speed = 1; instance.timeline_running = true; instance.timeline_loop = !!loop;
        },
        draw_set_color: color => { this.drawColor = numeric(color); },
        draw_set_alpha: alpha => { this.drawAlpha = Math.max(0, Math.min(1, alpha)); },
        draw_set_font: font => { this.drawFont = numeric(font); },
        draw_sprite: (sprite, image, x, y) => this.sprite(numeric(sprite), image < 0 ? instance.image_index : image, x, y),
        draw_text: (x, y, text) => this.text(x, y, String(text)),
        draw_rectangle: (x1, y1, x2, y2, outline) => {
          ctx.globalAlpha = this.drawAlpha; ctx.fillStyle = ctx.strokeStyle = rgb(this.drawColor);
          if (outline) ctx.strokeRect(x1, y1, x2 - x1, y2 - y1); else ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
        },
        action_draw_line: (x1, y1, x2, y2) => { ctx.globalAlpha = this.drawAlpha; ctx.strokeStyle = rgb(this.drawColor); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); },
        draw_healthbar: (x1, y1, x2, y2, percent, back, low, high, direction, showback, border) => {
          ctx.globalAlpha = this.drawAlpha;
          if (showback) { ctx.fillStyle = rgb(back); ctx.fillRect(x1, y1, x2 - x1, y2 - y1); }
          const fraction = Math.max(0, Math.min(1, percent / 100));
          const channel = shift => Math.round(((low >>> shift) & 255) * (1 - fraction) + ((high >>> shift) & 255) * fraction);
          ctx.fillStyle = `rgb(${channel(0)},${channel(8)},${channel(16)})`;
          ctx.fillRect(x1, y1, (x2 - x1) * fraction, y2 - y1);
          if (border) { ctx.strokeStyle = '#000'; ctx.strokeRect(x1, y1, x2 - x1, y2 - y1); }
        },
        effect_create_above: (...args) => this.effect(...args, true),
        effect_create_below: (...args) => this.effect(...args, false),
        action_effect: (type, x, y, size, color, above) => this.effect(type, x, y, size, color, above)
      };
    }
    effect(type, x, y, size, color, above) {
      const count = type === 0 ? 25 : 3;
      for (let i = 0; i < count; i++) this.particles.push({
        type, x, y, size: Math.max(1, size * (type === 9 ? 1 : 5)), color,
        dx: type === 9 ? 0 : (Math.random() - 0.5) * 6,
        dy: type === 9 ? 8 : (Math.random() - 0.7) * 6,
        life: type === 9 ? 30 : 25, total: type === 9 ? 30 : 25, above: !!above
      });
    }
    updateViews() {
      if (!this.roomData.viewsEnabled) return;
      this.views.forEach((view, i) => {
        if (!this.viewVisible[i] || view.object < 0) return;
        const target = this.byObject[view.object].find(x => !x.dead);
        if (!target) return;
        const bx = Math.min(view.borderx, view.w / 2), by = Math.min(view.bordery, view.h / 2);
        let x = this.viewX[i], y = this.viewY[i];
        if (target.x < x + bx) x = target.x - bx;
        if (target.x > x + view.w - bx) x = target.x - view.w + bx;
        if (target.y < y + by) y = target.y - by;
        if (target.y > y + view.h - by) y = target.y - view.h + by;
        x = Math.max(0, Math.min(this.roomData.width - view.w, x));
        y = Math.max(0, Math.min(this.roomData.height - view.h, y));
        const delta = (a, b, speed) => speed < 0 ? b : a + Math.max(-speed, Math.min(speed, b - a));
        this.viewX[i] = delta(this.viewX[i], x, view.speedx);
        this.viewY[i] = delta(this.viewY[i], y, view.speedy);
      });
    }
    step() {
      this.frame++;
      const active = this.instances.filter(i => !i.dead);
      for (const i of active) { i.xprevious = i.x; i.yprevious = i.y; this.event(i, 3, 1); }
      for (const i of active) if (!i.dead) {
        for (let alarm = 0; alarm < 12; alarm++) if (i.alarm[alarm] >= 0) {
          i.alarm[alarm]--;
          if (i.alarm[alarm] === 0) { i.alarm[alarm] = -1; this.event(i, 2, alarm); }
        }
        for (const key of held) this.event(i, 5, key);
        for (const key of pressed) this.event(i, 9, key);
        for (const key of released) this.event(i, 10, key);
        if (i.timeline_running && i.timeline_index >= 0) {
          const timeline = this.data.timelines[i.timeline_index];
          for (const [position, codes] of timeline.moments) if (position >= i.timeline_position && position < i.timeline_position + i.timeline_speed)
            for (const code of codes) this.run(code, i);
          i.timeline_position += i.timeline_speed;
          const end = timeline.moments[timeline.moments.length - 1]?.[0] || 0;
          if (i.timeline_position > end) {
            if (i.timeline_loop) i.timeline_position = 0;
            else i.timeline_running = false;
          }
        }
      }
      for (const i of active) if (!i.dead) this.event(i, 3, 0);
      for (const i of this.dynamics) if (!i.dead) {
        const rad = i.gravity_direction * Math.PI / 180;
        i.hspeed += Math.cos(rad) * i.gravity;
        i.vspeed -= Math.sin(rad) * i.gravity;
        i.x += i.hspeed; i.y += i.vspeed;
      }
      for (const i of active) if (!i.dead) {
        const events = this.data.objects[i.object_index].events[4] || [];
        if (!events.length) continue;
        const candidates = [...this.nearby(this.bbox(i))];
        for (const candidate of candidates) {
          if (candidate === i || candidate.dead || i.dead || !events.some(e => e[0] === candidate.object_index)) continue;
          if (!this.overlap(this.bbox(i), this.bbox(candidate))) continue;
          if (candidate.solid) { i.x = i.xprevious; i.y = i.yprevious; }
          this.event(i, 4, candidate.object_index, candidate);
          // GameMaker 1.x retries movement with the velocity set by the collision event.
          // Falling platforms must immediately move upward when they break a floor block.
          if (candidate.solid && !i.dead) {
            i.x += i.hspeed; i.y += i.vspeed;
            if (!candidate.dead && this.overlap(this.bbox(i), this.bbox(candidate))) {
              i.x = i.xprevious; i.y = i.yprevious;
            }
          }
        }
      }
      for (const i of active) if (!i.dead) {
        this.event(i, 3, 2);
        const sprite = this.data.sprites[i.sprite_index];
        if (sprite?.frames.length) {
          i.image_index += i.image_speed;
          if (i.image_index >= sprite.frames.length || i.image_index < 0) {
            i.image_index = ((i.image_index % sprite.frames.length) + sprite.frames.length) % sprite.frames.length;
            this.event(i, 7, 7);
          }
        }
      }
      for (const b of this.backgrounds) { b.x += b.hspeed; b.y += b.vspeed; }
      for (const p of this.particles) { p.x += p.dx; p.y += p.dy; p.life--; }
      this.particles = this.particles.filter(p => p.life > 0).slice(-2500);
      this.instances = this.instances.filter(i => !i.dead);
      this.dynamics = this.dynamics.filter(i => !i.dead);
      for (let n = 0; n < this.byObject.length; n++) this.byObject[n] = this.byObject[n].filter(i => !i.dead);
      pressed.clear(); released.clear();
      if (this.pendingRoom !== null) this.goto(this.pendingRoom);
      this.updateViews();
    }
    page(index, x, y, width, height) {
      const p = this.data.pages[index];
      if (!p) return;
      ctx.drawImage(this.textures[p[0]], p[1], p[2], p[3], p[4], x, y, width ?? p[7], height ?? p[8]);
    }
    sprite(index, frame, x, y, instance) {
      const sprite = this.data.sprites[index];
      if (!sprite?.frames.length) return;
      const pageId = sprite.frames[((Math.floor(frame) % sprite.frames.length) + sprite.frames.length) % sprite.frames.length];
      const page = this.data.pages[pageId];
      if (!page) return;
      ctx.save();
      ctx.translate(x, y);
      if (instance) { ctx.rotate(-instance.image_angle * Math.PI / 180); ctx.scale(instance.image_xscale, instance.image_yscale); }
      ctx.globalAlpha = this.drawAlpha * (instance?.image_alpha ?? 1);
      this.page(pageId, page[5] - sprite.origin[0], page[6] - sprite.origin[1]);
      ctx.restore();
    }
    text(x, y, text) {
      const font = this.data.fonts[this.drawFont];
      const page = this.data.pages[font.Texture.id];
      ctx.globalAlpha = this.drawAlpha;
      const start = x;
      for (const char of text) {
        if (char === '\n' || char === '#') { x = start; y += font.EmSize * 1.4; continue; }
        const glyph = font.Glyphs.find(g => g.Character === char.charCodeAt(0));
        if (!glyph) continue;
        ctx.drawImage(this.textures[page[0]], page[1] + glyph.SourceX, page[2] + glyph.SourceY, glyph.SourceWidth, glyph.SourceHeight,
          x + glyph.Offset, y, glyph.SourceWidth, glyph.SourceHeight);
        x += glyph.Shift;
      }
    }
    background(background, i, view) {
      const definition = this.data.backgrounds[this.backgroundIndex[i]];
      const pageId = definition?.page;
      const page = this.data.pages[pageId];
      if (!page) return;
      const width = background.stretch ? this.roomData.width : page[9];
      const height = background.stretch ? this.roomData.height : page[10];
      let x = background.x, y = background.y;
      if (background.tilex) x += Math.floor((view.x - x) / width) * width;
      if (background.tiley) y += Math.floor((view.y - y) / height) * height;
      ctx.globalAlpha = 1;
      for (let tx = x; tx < (background.tilex ? view.x + view.w : x + 1); tx += width)
        for (let ty = y; ty < (background.tiley ? view.y + view.h : y + 1); ty += height)
          this.page(pageId, tx + page[5], ty + page[6], width * page[7] / page[9], height * page[8] / page[10]);
    }
    drawParticles(above) {
      for (const p of this.particles) if (p.above === above) {
        ctx.globalAlpha = p.life / p.total;
        ctx.fillStyle = ctx.strokeStyle = rgb(p.color);
        if (p.type === 9) { ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x, p.y + p.size); ctx.stroke(); }
        else { ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (1 - p.life / p.total + 0.15), 0, Math.PI * 2); ctx.fill(); }
      }
    }
    draw() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1366, 768);
      ctx.imageSmoothingEnabled = false;
      // The legacy runner draws equal-depth instances in reverse creation order.
      const instances = this.instances.filter(i => !i.dead && i.visible).reverse().sort((a, b) => b.depth - a.depth);
      const views = this.roomData.viewsEnabled ? this.views.map((v, i) => ({ ...v, x: this.viewX[i], y: this.viewY[i], enabled: this.viewVisible[i], index: i })).filter(v => v.enabled) : [{ x: 0, y: 0, w: 1366, h: 768, px: 0, py: 0, pw: 1366, ph: 768, index: 0 }];
      for (const view of views) {
        this.viewCurrent = view.index;
        ctx.save();
        ctx.beginPath(); ctx.rect(view.px, view.py, view.pw, view.ph); ctx.clip();
        ctx.translate(view.px, view.py); ctx.scale(view.pw / view.w, view.ph / view.h); ctx.translate(-view.x, -view.y);
        ctx.globalAlpha = 1;
        if (this.roomData.drawColor) { ctx.fillStyle = rgb(this.backgroundColor); ctx.fillRect(view.x, view.y, view.w, view.h); }
        this.backgrounds.forEach((b, i) => { if (b.enabled && !b.foreground) this.background(b, i, view); });
        this.drawParticles(false);
        for (const instance of instances) {
          this.drawAlpha = 1;
          const custom = this.data.objects[instance.object_index].events[8]?.some(e => e[0] === 0);
          if (custom) this.event(instance, 8, 0);
          else {
            const sprite = this.data.sprites[instance.sprite_index];
            const width = sprite ? sprite.width * Math.abs(instance.image_xscale) : 0;
            const height = sprite ? sprite.height * Math.abs(instance.image_yscale) : 0;
            if (instance.x + width >= view.x && instance.x - width <= view.x + view.w && instance.y + height >= view.y && instance.y - height <= view.y + view.h)
              this.sprite(instance.sprite_index, instance.image_index, instance.x, instance.y, instance);
          }
        }
        this.backgrounds.forEach((b, i) => { if (b.enabled && b.foreground) this.background(b, i, view); });
        this.drawParticles(true);
        ctx.restore();
      }
      for (const instance of instances) { this.drawAlpha = 1; this.event(instance, 8, 64); }
      ctx.globalAlpha = 1;
    }
  }
  window.addEventListener('keydown', event => {
    if ([13, 16, 27, 32, 37, 38, 39, 40, 70].includes(event.keyCode)) event.preventDefault();
    audio?.unlock().catch(fail);
    if (!held.has(event.keyCode)) pressed.add(event.keyCode);
    held.add(event.keyCode);
  });
  window.addEventListener('keyup', event => { held.delete(event.keyCode); released.add(event.keyCode); });
  window.addEventListener('pointerdown', () => { canvas.focus(); audio?.unlock().catch(fail); });
  window.addEventListener('blur', () => { held.clear(); pressed.clear(); released.clear(); });
  let lastTime, accumulator = 0;
  document.addEventListener('visibilitychange', () => { lastTime = undefined; accumulator = 0; });
  async function start() {
    const response = await fetch('game.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Game data missing');
    const data = await response.json();
    const total = 19 + data.sounds.length;
    let complete = 0;
    const tick = () => { progress.style.width = `${++complete / total * 100}%`; };
    audio = new Sound(data.sounds);
    const textures = await loadAssets(Array.from({ length: 19 }, (_, i) => i), async i => {
      const image = new Image(); image.src = `assets/texture-${i}.png`;
      try { await image.decode(); }
      catch (error) { throw new Error(`Unable to load assets/texture-${i}.png: ${error.message}`); }
      tick(); return image;
    });
    await audio.load(tick);
    game = new Game(data, textures);
    window.__mario = game;
    window.__marioAudio = audio;
    game.draw();
    document.getElementById('loader').style.display = 'none';
    canvas.focus();
    function loop(time) {
      if (failed) return;
      try {
        if (lastTime !== undefined && !document.hidden) accumulator += Math.min(150, time - lastTime);
        lastTime = time;
        let steps = 0;
        while (accumulator >= 1000 / game.speed && steps++ < 8) {
          accumulator -= 1000 / game.speed;
          game.step(); game.draw();
        }
        requestAnimationFrame(loop);
      } catch (error) { fail(error); }
    }
    requestAnimationFrame(loop);
  }
  start().catch(fail);
})();
