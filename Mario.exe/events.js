/* Original recovered GML events, adapted to browser instance scopes. */
window.MARIO_EVENTS=[
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
started = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
var __b__ = action_if(started == 0);
if (__b__)
{
    action_timeline_set(0, 0, 0, 0);
    started = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
image_speed = 0.2;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
image_speed = 0.2;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
i = random(1);
if (i <= 0.5)
{
    hspeed = -2.5;
}
else
{
    hspeed = 2.5;
}
image_speed = 0.2;
gravity = 0.5;
alarm[0] = irandom(150);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
hspeed = 0;
sprite_index = spr_toad_fired_dead;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (place_free(x, y + 1))
{
    gravity = 0.5;
}
else
{
    gravity = 0;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_create_object(obj_blood, x, y);
action_kill_object();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (view_xview[0])
{
    x = view_xview[0];
    y = view_yview[0];
}
else
{
    x = view_xview[1];
    y = view_yview[1];
}
image_speed = 1;
audio_play_sound(choose(snd_scream1, snd_scream2), 1, false);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (view_visible[0])
{
    x = view_xview[0];
    y = view_yview[0];
}
else
{
    x = view_xview[1];
    y = view_yview[1];
}
image_speed = 3;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;
enabled_sound = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (enabled)
{
    if (place_free(x, y + 1))
    {
        gravity = 0.3;
    }
    else
    {
        gravity = 0;
    }
    if (place_meeting(x, y + 1, other))
    {
        other.destroy = 1;
    }
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
var __b__ = action_if_variable(enabled_sound, 1, 0);
if (__b__)
{
    action_sound(1, 0);
}
action_set_vspeed(-6);
for (const __with0 of __select(other)) { with (__scope(__with0, self)) {
    action_kill_object();
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
var __b__ = action_if_variable(enabled_sound, 1, 0);
if (__b__)
{
    action_sound(1, 0);
}
action_set_vspeed(-6);
for (const __with0 of __select(other)) { with (__scope(__with0, self)) {
    action_kill_object();
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
var __b__ = action_if_variable(enabled_sound, 1, 0);
if (__b__)
{
    action_sound(1, 0);
}
action_set_vspeed(-6);
for (const __with0 of __select(other)) { with (__scope(__with0, self)) {
    action_kill_object();
}}
__b__ = action_if_sound(12);
if (!__b__)
{
    action_sound(12, 0);
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    if (!audio_is_playing(snd_luigi_dead_grib))
    {
        audio_play_sound(snd_luigi_dead_grib, 1, false);
    }
    obj_player.enabled = 0;
    obj_player.sprite_index = spr_luigi_dead_1;
    obj_player.image_speed = 0.3;
    visible = false;
    enabled = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
mirror = 0;
_2xspeed = 7;
enabled = 1;
image_speed = 0.5;
killing_spree = 0;
collision_block_dead = 0;
enabled_alarm_1 = 0;
enabled_alarm_in = 0;
enabled_blood = 0;
down_jump = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled_alarm_1)
{
    obj_live.live--;
    if (obj_live.live < 0)
    {
        room_goto(game_over);
    }
    else
    {
        if (room == level_1)
        {
            room_goto(room_live_1);
        }
        if (room == level_2)
        {
            room_goto(room_live_2);
        }
        if (room == level_3)
        {
            room_goto(room_live_3);
        }
        enabled_alarm_1 = 1;
    }
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (keyboard_check(vk_right) && place_free(x + 15, y) && enabled)
{
    sprite_index = spr_luigi_walk;
    if (keyboard_check(vk_shift))
    {
        x += (9 + _2xspeed);
        image_speed = 0.5;
    }
    else
    {
        x += 9;
        image_speed = 0.2;
    }
    mirror = 0;
}
if (keyboard_check(vk_left) && place_free(x - 15, y) && enabled)
{
    sprite_index = spr_luigi_walk;
    if (keyboard_check(vk_shift))
    {
        x += (-9 - _2xspeed);
        image_speed = 0.5;
    }
    else
    {
        x += -9;
        image_speed = 0.2;
    }
    mirror = 1;
}
if (keyboard_check(vk_up) && !place_free(x, y + 1) && enabled)
{
    vspeed = -23;
    if (audio_is_playing(snd_jump_juigi))
    {
        audio_stop_sound(snd_jump_juigi);
    }
    audio_play_sound(snd_jump_juigi, 1, false);
}
if (place_free(x, y + 1))
{
    gravity = 1;
    if (enabled)
    {
        sprite_index = spr_luigi_jump;
        down_jump = 0;
    }
}
else
{
    gravity = 0;
    if (enabled)
    {
        if (!down_jump)
        {
            sprite_index = spr_luigi;
            down_jump = 1;
        }
    }
}
if (keyboard_check_released(vk_left) || keyboard_check_released(vk_right))
{
    if (enabled)
    {
        sprite_index = spr_luigi;
    }
}
if (keyboard_check(vk_space))
{
}
if (mirror)
{
    image_xscale = -1;
}
else
{
    image_xscale = 1;
}
if (killing_spree)
{
    if (hspeed >= 0)
    {
        hspeed--;
    }
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled_alarm_in)
{
    obj_player.enabled = 0;
    audio_stop_all();
    audio_play_sound(snd_loser, 1, false);
    alarm[1] = 120;
    enabled_alarm_in = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_set_alarm(120, 1);
var __b__ = action_if_variable(enabled_blood, 0, 0);
if (__b__)
{
    audio_stop_all();
    audio_play_sound(snd_loser, 1, false);
    action_create_object(obj_blood, obj_player.x, obj_player.y);
    enabled_blood = 1;
}
for (const __with0 of __select(obj_camera)) { with (__scope(__with0, self)) {
    action_kill_object();
}}
visible = false;
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;
if (!collision_block_dead)
{
    instance_create(obj_player.x, obj_player.y, obj_blood);
    obj_player.enabled = 0;
    obj_player.sprite_index = spr_luigi_dead_2;
    obj_player.image_speed = 0.2;
    collision_block_dead = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_set_alarm(120, 1);
var __b__ = action_if_variable(enabled_blood, 0, 0);
if (__b__)
{
    audio_stop_all();
    audio_play_sound(snd_loser, 1, false);
    action_create_object(obj_blood, obj_player.x, obj_player.y);
    enabled_blood = 1;
}
for (const __with0 of __select(obj_camera)) { with (__scope(__with0, self)) {
    action_kill_object();
}}
visible = false;
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (sprite_index == spr_luigi_dead_head)
{
    image_speed = 0;
    image_index = 15;
    if (!enabled_alarm_in)
    {
        audio_stop_all();
        audio_play_sound(snd_loser, 1, false);
        alarm[1] = 120;
        enabled_alarm_in = 1;
    }
}
if (sprite_index == spr_luigi_dead_2)
{
    image_speed = 0;
    image_index = 5;
    if (!enabled_alarm_in)
    {
        audio_stop_all();
        audio_play_sound(snd_loser, 1, false);
        alarm[1] = 120;
        enabled_alarm_in = 1;
    }
}
if (sprite_index == spr_luigi_dead_1)
{
    image_speed = 0;
    image_index = 70;
    if (!enabled_alarm_in)
    {
        audio_stop_all();
        audio_play_sound(snd_loser, 1, false);
        alarm[1] = 120;
        enabled_alarm_in = 1;
    }
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
act = 0;
scene = 1;
mirror = 0;
killing_spree = 0;
effect1_enabled = 0;
action_6_enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
image_speed = 0.5;
if (mirror)
{
    image_xscale = -1;
}
else
{
    image_xscale = 1;
}
if (killing_spree)
{
    if (hspeed > 0)
    {
        hspeed--;
    }
}
switch (scene)
{
    case 1:
        if (act == 1)
        {
            sprite_index = spr_mario_exe_stand;
            hspeed = 0;
        }
        if (act == 2)
        {
            sprite_index = spr_mario_exe_stand_smile;
            hspeed = 0;
        }
        if (act == 3)
        {
            sprite_index = spr_mario_exe_walk_with_fire;
            hspeed = -2.5;
        }
        if (act == 4)
        {
            sprite_index = spr_mario_exe_stand_with_fire;
            hspeed = 0;
        }
        if (act == 5)
        {
            sprite_index = spr_mario_exe_stand_back_with_fire;
            hspeed = 0;
        }
        if (act == 6)
        {
            sprite_index = spr_mario_exe_stand_back_with_fire_and_smile;
            hspeed = 0;
        }
        if (act == 7)
        {
            sprite_index = spr_mario_exe_stand_back_with_fire_action;
        }
        if (act == 8)
        {
            sprite_index = spr_mario_exe_walk;
            hspeed = 20;
        }
        break;
    case 2:
        if (act == 1)
        {
            sprite_index = spr_mario_exe_walk;
            hspeed = 60;
        }
        if (act == 2)
        {
            sprite_index = spr_mario_exe_walk;
            image_xscale = -1;
            hspeed = -100;
        }
        if (act == 3)
        {
            sprite_index = spr_mario_exe_stand_smile;
            image_xscale = 1;
            hspeed = 0;
        }
        break;
    case 3:
        if (act == 1)
        {
            sprite_index = spr_mario_exe_stand;
        }
        if (act == 2)
        {
            sprite_index = spr_mario_exe_stand;
            mirror = 1;
        }
        if (act == 3)
        {
            sprite_index = spr_mario_exe_stand_smile;
        }
        if (act == 4)
        {
            sprite_index = spr_mario_exe_stand_smile;
            mirror = 0;
        }
        if (act == 5)
        {
            image_speed = 0.2;
            sprite_index = spr_mario_exe_push;
        }
        if (act == 6)
        {
            mirror = 1;
            image_speed = 0.3;
            sprite_index = spr_mario_exe_walk;
        }
        if (act == 7)
        {
            mirror = 0;
            sprite_index = spr_mario_exe_look_down;
        }
        if (act == 8)
        {
            sprite_index = spr_mario_exe_hold;
            killing_spree = 1;
        }
        if (act == 9)
        {
            sprite_index = spr_mario_exe_walk;
            hspeed = 35;
        }
        break;
    case 4:
        if (act == 1)
        {
            if (!effect1_enabled)
            {
                effect_create_above(0, x, y, 2, 255);
                visible = false;
            }
            effect1_enabled = 1;
        }
        if (act == 2)
        {
            visible = false;
            for (i = 0; i <= 25; i++)
            {
                effect_create_below(9, view_xview[0] + random(room_width), view_yview[0] + random(room_height), random(5) + 15, 255);
            }
        }
        if (act == 3)
        {
            mirror = 1;
            sprite_index = spr_mario_exe_sword;
            visible = true;
            if (y < obj_player.y)
            {
                y += 7;
            }
            if (y > obj_player.y)
            {
                y -= 7;
            }
            if (x < obj_player.x)
            {
                hspeed = 30;
            }
            else
            {
                hspeed = -30;
            }
        }
        break;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (killing_spree)
{
    obj_player.enabled = 0;
    obj_player.image_speed = 0.25;
    obj_player.sprite_index = spr_luigi_dead_head;
}
if (scene == 4 && act == 3)
{
    room_goto(level_scremmer_1);
}
var __b__ = action_if_variable(scene, 4, 0);
if (__b__)
{
    __b__ = action_if_variable(action_6_enabled, 0, 0);
    if (__b__)
    {
        action_timeline_set(6, 0, 0, 0);
        action_6_enabled = 1;
    }
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (sprite_index == spr_mario_exe_push)
{
    image_speed = 0;
    image_index = 6;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
selected = 1;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_next_room();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
switch (selected)
{
    case 1:
        y = 465;
        break;
    case 2:
        y = 520;
        break;
}
if (keyboard_check_pressed(vk_down))
{
    if (selected == 1)
    {
        selected = 2;
    }
    else
    {
        selected = 1;
    }
}
if (keyboard_check_pressed(vk_up))
{
    if (selected == 2)
    {
        selected = 1;
    }
    else
    {
        selected = 2;
    }
}
if (keyboard_check_released(vk_enter) && selected == 2)
{
    background_index[0] = bck_menu_hell;
    alarm[0] = 5;
}
if (keyboard_check_released(vk_enter) && selected == 1)
{
    audio_play_sound(snd_pg3, 1, false);
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_set_alarm(10, 0);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_next_room();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
x = obj_player.x + 500;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
x = obj_player.x + 500;
y = obj_player.y;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
var __b__ = action_if_life(7, 0);
if (__b__)
{
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
draw_set_font(fontGUI);
draw_set_color(c_white);
if (view_visible[0])
{
    draw_text(view_xview[0] + 30, view_yview[0] + 30, "LUIGI");
    draw_text(view_xview[0] + 30, view_yview[0] + 60, "000000");
    if (room == level_1)
    {
        draw_text(view_xview[0] + 600, view_yview[0] + 30, "WORLD");
        draw_text(view_xview[0] + 625, view_yview[0] + 60, "1-1");
    }
    if (room == level_2)
    {
        draw_text(view_xview[0] + 600, view_yview[0] + 30, "WORLD");
        draw_text(view_xview[0] + 625, view_yview[0] + 60, "1-2");
    }
    if (room == level_3)
    {
        draw_text(view_xview[0] + 600, view_yview[0] + 30, "WORLD");
        draw_text(view_xview[0] + 625, view_yview[0] + 60, "1-3");
    }
    if (room == level_4)
    {
        draw_text(view_xview[0] + 600, view_yview[0] + 30, "WORLD");
        draw_text(view_xview[0] + 625, view_yview[0] + 60, "E-0");
    }
    draw_text(view_xview[0] + 1230, view_yview[0] + 30, "TIME");
    draw_text(view_xview[0] + 1258, view_yview[0] + 60, "000");
}
if (view_visible[1])
{
    if (room == level_3)
    {
        draw_text(view_xview[1] + 30, view_yview[1] + 30, "LUIGI");
        draw_text(view_xview[1] + 30, view_yview[1] + 60, "000000");
        draw_text(view_xview[1] + 600, view_yview[1] + 30, "WORLD");
        draw_text(view_xview[1] + 625, view_yview[1] + 60, "1-3");
        draw_text(view_xview[1] + 1230, view_yview[1] + 30, "TIME");
        draw_text(view_xview[1] + 1258, view_yview[1] + 60, "000");
    }
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
alpha = 1;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
alpha -= 0.05;
if (alpha == 0)
{
    draw_set_alpha(1);
    instance_destroy();
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
draw_set_color(c_black);
draw_set_alpha(alpha);
if (view_visible[0])
{
    draw_rectangle(view_xview[0], view_yview[0], room_width, room_height, false);
}
else
{
    draw_rectangle(view_xview[1], view_yview[1], room_width, room_height, false);
}
draw_set_alpha(1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_create_object(obj_toad_fired, 10590, 637);
for (const __with0 of __select(obj_toad_fired)) { with (__scope(__with0, self)) {
    action_set_hspeed(5);
}}
action_set_alarm(10, 0);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_create_object(obj_toad_fired, 10590, 637);
action_kill_object();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_create_object(obj_toad_fired, 10590, 637);
action_set_alarm(10, 2);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_create_object(obj_toad_fired, 10590, 637);
action_set_alarm(10, 1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
image_index = 0;
image_speed = 0.7;
action_sound(2, 0);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (image_index >= 4 && 5 <= image_index)
{
    instance_destroy();
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (view_visible[0])
{
    view_visible[1] = true;
    view_visible[0] = false;
}
alarm[0] = 5;
room_speed = 4;
act[1] = 1;
act[2] = 0;
action_sound(3, 0);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
act[1] = 0;
act[2] = 1;
action_set_alarm(6, 0);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
act[1] = 1;
act[2] = 0;
action_set_alarm(6, 1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (room_speed <= 60)
{
    room_speed++;
}
if (act[1])
{
    view_xview[1] += 15;
    view_yview[1] += 15;
}
if (act[2])
{
    view_xview[1] -= 15;
    view_yview[1] -= 15;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_next_room();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_sound(snd_mario_exe_steps);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    instance_create(832, 0, obj_mario);
    obj_mario.scene = 2;
    obj_mario.act = 1;
    audio_play_sound(snd_mario_exe_steps, 1, true);
    alarm[0] = 70;
    enabled = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
hspeed = -27;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_sound(1, 0);
for (const __with0 of __select(other)) { with (__scope(__with0, self)) {
    action_kill_object();
}}
action_kill_object();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_wall1)) { with (__scope(__with0, self)) {
    action_kill_object();
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
var __b__ = action_if_variable(enabled, 0, 0);
if (__b__)
{
    for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
        action_kill_object();
    }}
    action_create_object(obj_mario, 2380, 2688);
    instance_create(2700, 3392, obj_horiz_igla);
    instance_create(3800, 3392, obj_horiz_igla);
    instance_create(4900, 3200, obj_horiz_igla);
    instance_create(6000, 3392, obj_horiz_igla);
    instance_create(7100, 3328, obj_horiz_igla);
    instance_create(8200, 3392, obj_horiz_igla);
    instance_create(9300, 3328, obj_horiz_igla);
    instance_create(10400, 3200, obj_horiz_igla);
    instance_create(11500, 3200, obj_horiz_igla);
    alarm[0] = 300;
    for (const __with1 of __select(obj_mario)) { with (__scope(__with1, self)) {
        action_timeline_set(1, 0, 0, 0);
    }}
    enabled = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;
image_speed = 0.3;
killing_spree = 0;
my_hspeed = -30;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (killing_spree)
{
    if (hspeed <= 0)
    {
        hspeed++;
    }
    else
    {
        hspeed--;
    }
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    enabled = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (sprite_index == spr_toad_zombie)
{
    image_speed = 0;
    image_index = 3;
}
if (sprite_index == spr_toad_zombie_back)
{
    image_speed = 0;
    image_index = 7;
}
if (sprite_index == spr_toad_zombie_dead)
{
    image_speed = 0;
    image_index = 6;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled_dead = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!place_free(x, y + 1))
{
    gravity = 0;
}
else
{
    gravity = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
sound_stop_all();
move_contact_solid(direction, 64);
vspeed = 0;
if (!enabled_dead)
{
    sound_stop_all();
    audio_play_sound(snd_horror10, 1, false);
    instance_create(x, y, obj_blood);
    sprite_index = spr_princess_dead;
    enabled_dead = 0;
}
action_end_sound(21);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
move_contact_solid(direction, 64);
vspeed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
image_speed = 0.5;
audio_play_sound(snd_horror_toad, 1, false);
act = 0;
alpha = 1;
alarm[0] = 15;
obj_player.sprite_index = spr_luigi;
obj_player.image_speed = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_kill_object();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_timeline_set(2, 0, 0, 0);
action_set_alarm(20, 2);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
act = 1;
alarm[1] = 4;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
image_speed = 0;
image_index = 5;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (act == 1)
{
    alpha -= 0.1;
}
draw_set_alpha(alpha);
draw_sprite(spr_scrimmer_toad1, -3, view_xview[0], view_yview[0]);
draw_set_alpha(1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    obj_player.enabled = 0;
    instance_create(view_xview[0] + 9, view_yview[0], obj_scrimmer_toad1);
    enabled = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
percent = 20;
alarm[0] = 11;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
percent -= 5;
alarm[0] = 11;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
var __b__ = action_if_variable(percent, 0, 3);
if (__b__)
{
    action_sound(2, 0);
    for (const __with0 of __select(obj_brick_dark)) { with (__scope(__with0, self)) {
        action_timeline_set(4, 0, 0, 0);
    }}
    action_kill_object();
}
__b__ = action_if_variable(percent, 100, 4);
if (__b__)
{
    action_sound(2, 0);
    for (const __with1 of __select(obj_brick_dark)) { with (__scope(__with1, self)) {
        action_timeline_set(3, 0, 0, 0);
    }}
    action_kill_object();
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
image_speed = 0.2;
draw_sprite(spr_press_f, -3, 683, 200);
draw_healthbar(128, 360, 1238, 410, percent, c_gray, c_red, c_lime, 0, 1, 1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
percent += 5;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_next_room();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    obj_princess.visible = true;
    obj_mario.visible = true;
    obj_trigger6.activated = 1;
    enabled = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    instance_create(x, y, obj_alpha_black);
    obj_decor3_diablo.visible = false;
    obj_decor3_text5.visible = false;
    view_visible[0] = false;
    view_visible[1] = true;
    enabled = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;
activated = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
var __b__ = action_if_variable(activated, 1, 0);
if (__b__)
{
    __b__ = action_if_variable(enabled, 0, 0);
    if (__b__)
    {
        for (const __with0 of __select(obj_player)) { with (__scope(__with0, self)) {
            enabled = 0;
        }}
        action_timeline_set(5, 0, 0, 0);
        for (const __with1 of __select(obj_decor3_text6)) { with (__scope(__with1, self)) {
            visible = false;
        }}
        for (const __with2 of __select(obj_decor3_text7)) { with (__scope(__with2, self)) {
            visible = true;
        }}
        for (const __with3 of __select(obj_finish3)) { with (__scope(__with3, self)) {
            enabled = 1;
        }}
        enabled = 1;
        audio_stop_all();
    }
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (enabled)
{
    room_goto_next();
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_all();
audio_play_sound(snd_final_dead, 1, false);
alarm[0] = 60;
alpha = 1;
fuck = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_next_room();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
fuck = 1;
alarm[1] = 80;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
image_speed = 0;
image_index = 3;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (fuck)
{
    alpha -= 0.02;
}
draw_set_alpha(alpha);
draw_sprite(spr_bloody, -3, room_width / 2, room_height / 2);
draw_set_alpha(1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_restart_game();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_effect(1, x + random(sprite_width), y + random(sprite_height), 1, 8388736, 0);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_draw_line(0, 0, 0, 0);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    instance_create(view_xview[0], view_yview[0], obj_pomexa);
    enabled = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    instance_create(view_xview[0], view_yview[0], obj_pomexa_small);
    enabled = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 0;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    instance_create(view_xview[0], view_yview[0], obj_pomexa_long);
    enabled = 1;
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
obj_player.enabled = 0;
x = view_xview[0];
y = view_yview[0];
audio_play_sound(snd_pomexa, 1, true);
alarm[0] = 50;
obj_player.sprite_index = spr_luigi;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_sound(snd_pomexa);
obj_player.enabled = 1;
instance_destroy();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
draw_sprite(spr_pomexa, -3, view_xview[0], view_yview[0]);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
obj_player.enabled = 0;
x = view_xview[0];
y = view_yview[0];
audio_play_sound(snd_pomexa, 1, true);
alarm[0] = 200;
obj_player.sprite_index = spr_luigi;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_sound(snd_pomexa);
obj_blood1.visible = true;
obj_blood2.visible = true;
obj_blood3.visible = true;
obj_player.enabled = 1;
instance_destroy();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
draw_sprite(spr_pomexa, -3, view_xview[0], view_yview[0]);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
obj_player.enabled = 0;
x = view_xview[0];
y = view_yview[0];
audio_play_sound(snd_pomexa, 1, true);
alarm[0] = 10;
obj_player.sprite_index = spr_luigi;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_sound(snd_pomexa);
obj_player.enabled = 1;
instance_destroy();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
draw_sprite(spr_pomexa, -3, view_xview[0], view_yview[0]);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_all();
audio_play_sound(snd_intro, 1, false);
alpha = 1;
enabled = 0;
alarm[0] = 150;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_next_room();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 1;
alpha = 0;
alarm[1] = 22;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    alpha -= 0.05;
    draw_set_color(c_black);
    draw_set_alpha(alpha);
    draw_rectangle(0, 0, room_width, room_height, false);
}
else
{
    alpha += 0.05;
    draw_set_color(c_black);
    draw_set_alpha(alpha);
    draw_rectangle(0, 0, room_width, room_height, false);
}
draw_set_alpha(1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_all();
alpha = 1;
enabled = 0;
alarm[0] = 150;
action_set_cursor(-1, 0);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_next_room();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
enabled = 1;
alpha = 0;
alarm[1] = 22;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!enabled)
{
    alpha -= 0.05;
    draw_set_color(c_black);
    draw_set_alpha(alpha);
    draw_rectangle(0, 0, room_width, room_height, false);
}
else
{
    alpha += 0.05;
    draw_set_color(c_black);
    draw_set_alpha(alpha);
    draw_rectangle(0, 0, room_width, room_height, false);
}
draw_set_alpha(1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_set_alarm(60, 0);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_next_room();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
draw_set_font(fontGUI);
draw_set_color(c_white);
draw_sprite(spr_luigi, -3, (room_width / 2) - 64, room_height / 2);
draw_text(room_width / 2, room_height / 2, "X");
draw_text((room_width / 2) + 64, room_height / 2, obj_live.live);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
live = 5;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
alarm[0] = 180;
audio_stop_all();
audio_play_sound(snd_gameover, 1, false);
obj_live.live = 5;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_another_room(1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
draw_set_font(fontGUI);
draw_set_alpha(1);
draw_set_color(c_white);
draw_text((room_width / 2) - 128, room_height / 2, "GAME OVER");

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_all();
disabled_sound = 0;
alarm[0] = 30;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_next_room();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
disabled_sound = 1;
action_set_alarm(100, 1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
if (!disabled_sound)
{
    audio_play_sound(snd_super_scrimmer, 1, false);
}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_all();
audio_play_sound(mus_gameover_real, 1, false);
alarm[0] = 3000;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_next_room();

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_all();
audio_play_sound(snd_pomexa, 1, true);
sprite_index = spr_pomexa;
alarm[0] = 80;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_all();
audio_play_sound(mus_ierogliv, 1, true);
sprite_index = spr_iegorliv;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_end_sound(9);
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 1;
}}
for (const __with1 of __select(obj_player)) { with (__scope(__with1, self)) {
    hspeed = 0;
}}
for (const __with2 of __select(obj_player)) { with (__scope(__with2, self)) {
    enabled = 0;
}}
for (const __with3 of __select(obj_player)) { with (__scope(__with3, self)) {
    sprite_index = spr_luigi;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_sound(28, 0);
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 2;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_sound(15, 0);
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 3;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 4;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 5;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 6;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 5;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 7;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 8;
}}
action_create_object(obj_maya_fire, 0, 0);
action_create_object(obj_alpha_black, 0, 0);
action_create_object(obj_create_fired_toad, 0, 0);
for (const __with1 of __select(other)) { with (__scope(__with1, self)) {
    background_color = c_red;
}}
for (const __with2 of __select(obj_tower)) { with (__scope(__with2, self)) {
    action_sprite_set(42, -3, 1);
}}
obj_hill2.visible = false;
obj_flag.visible = false;
obj_block__.visible = false;
action_end_sound(15);
action_sound(16, 1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 1;
}}
for (const __with1 of __select(obj_platform_igla)) { with (__scope(__with1, self)) {
    enabled = 1;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_create_object(obj_adrenalin, 0, 0);
for (const __with0 of __select(obj_player)) { with (__scope(__with0, self)) {
    enabled = 1;
}}
for (const __with1 of __select(obj_mario)) { with (__scope(__with1, self)) {
    action_kill_object();
}}
obj_platform_igla.enabled_sound = 1;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_adrenalin)) { with (__scope(__with0, self)) {
    action_kill_object();
}}
view_visible[1] = false;
view_visible[0] = true;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    scene = 2;
}}
for (const __with1 of __select(obj_mario)) { with (__scope(__with1, self)) {
    act = 2;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 3;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_toad_skrimmer)) { with (__scope(__with0, self)) {
    sprite_index = spr_toad_zombie;
}}
for (const __with1 of __select(obj_player)) { with (__scope(__with1, self)) {
    sprite_index = spr_luigi;
}}
for (const __with2 of __select(obj_toad_skrimmer)) { with (__scope(__with2, self)) {
    action_set_hspeed(-20);
}}
audio_stop_sound(mus_level_2);
audio_play_sound(mus_fight, 1, true);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_toad_skrimmer)) { with (__scope(__with0, self)) {
    sprite_index = spr_toad_zombie_hold;
}}
for (const __with1 of __select(obj_player)) { with (__scope(__with1, self)) {
    sprite_index = spr_luigi_hold;
}}
for (const __with2 of __select(obj_player)) { with (__scope(__with2, self)) {
    image_speed = 0.3;
}}
for (const __with3 of __select(obj_toad_skrimmer)) { with (__scope(__with3, self)) {
    action_set_hspeed(0);
}}
action_create_object(obj_button_f, x, y);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_end_sound(27);
var __b__ = action_if_sound(25);
if (!__b__)
{
    action_sound(25, 0);
}
for (const __with0 of __select(obj_player)) { with (__scope(__with0, self)) {
    hspeed = 30;
}}
for (const __with1 of __select(obj_player)) { with (__scope(__with1, self)) {
    killing_spree = 1;
}}
for (const __with2 of __select(obj_player)) { with (__scope(__with2, self)) {
    image_speed = 0;
}}
for (const __with3 of __select(obj_toad_skrimmer)) { with (__scope(__with3, self)) {
    image_speed = 0.2;
}}
for (const __with4 of __select(obj_toad_skrimmer)) { with (__scope(__with4, self)) {
    sprite_index = spr_toad_zombie_dead;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_player)) { with (__scope(__with0, self)) {
    killing_spree = 0;
}}
for (const __with1 of __select(obj_player)) { with (__scope(__with1, self)) {
    hspeed = 0;
}}
for (const __with2 of __select(obj_player)) { with (__scope(__with2, self)) {
    enabled = 20;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_end_sound(27);
var __b__ = action_if_sound(25);
if (!__b__)
{
    action_sound(25, 0);
}
for (const __with0 of __select(obj_toad_skrimmer)) { with (__scope(__with0, self)) {
    hspeed = obj_toad_skrimmer.my_hspeed;
}}
for (const __with1 of __select(obj_toad_skrimmer)) { with (__scope(__with1, self)) {
    killing_spree = 1;
}}
for (const __with2 of __select(obj_player)) { with (__scope(__with2, self)) {
    image_speed = 0.25;
}}
for (const __with3 of __select(obj_player)) { with (__scope(__with3, self)) {
    sprite_index = spr_luigi_dead_head;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_toad_skrimmer)) { with (__scope(__with0, self)) {
    killing_spree = 0;
}}
for (const __with1 of __select(obj_toad_skrimmer)) { with (__scope(__with1, self)) {
    hspeed = 0;
}}
for (const __with2 of __select(obj_toad_skrimmer)) { with (__scope(__with2, self)) {
    image_speed = 0.1;
}}
for (const __with3 of __select(obj_toad_skrimmer)) { with (__scope(__with3, self)) {
    sprite_index = spr_toad_zombie_back;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_end_sound(10);
for (const __with0 of __select(obj_player)) { with (__scope(__with0, self)) {
    sprite_index = spr_luigi;
}}
for (const __with1 of __select(obj_mario)) { with (__scope(__with1, self)) {
    scene = 3;
}}
for (const __with2 of __select(obj_mario)) { with (__scope(__with2, self)) {
    act = 1;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 2;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 3;
}}
action_sound(29, 0);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 4;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 5;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_princess)) { with (__scope(__with0, self)) {
    hspeed = -10;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
action_sound(21, 0);
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    hspeed = -3.2;
}}
for (const __with1 of __select(obj_mario)) { with (__scope(__with1, self)) {
    act = 6;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_princess)) { with (__scope(__with0, self)) {
    hspeed = 0;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    hspeed = 0;
}}
for (const __with1 of __select(obj_mario)) { with (__scope(__with1, self)) {
    act = 7;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
view_visible[1] = false;
view_visible[2] = true;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
view_visible[2] = false;
view_visible[1] = true;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 1;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
var __b__ = action_if_sound(25);
if (!__b__)
{
    action_sound(25, 0);
}
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 8;
}}
for (const __with1 of __select(obj_mario)) { with (__scope(__with1, self)) {
    killing_spree = 1;
}}
for (const __with2 of __select(obj_mario)) { with (__scope(__with2, self)) {
    hspeed = 40;
}}
for (const __with3 of __select(obj_player)) { with (__scope(__with3, self)) {
    enabled = 1;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    killing_spree = 0;
}}
for (const __with1 of __select(obj_mario)) { with (__scope(__with1, self)) {
    act = 3;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 9;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 1;
}}
action_end_sound(13);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    act = 2;
}}
action_sound(14, 1);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
for (const __with0 of __select(obj_mario)) { with (__scope(__with0, self)) {
    x = -100;
}}
for (const __with1 of __select(obj_mario)) { with (__scope(__with1, self)) {
    act = 3;
}}

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_all();
audio_play_sound(mus_level_1, 1, true);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_all();
audio_play_sound(mus_level_2, 1, true);

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
audio_stop_all();
audio_play_sound(mus_level_3, 1, true);
obj_mario.visible = false;
obj_princess.visible = false;
obj_decor3_text7.visible = false;

}},
function(__scope,__select,__instance,__other){with(__scope(__instance,__other)){
obj_mario.scene = 4;
audio_stop_all();
audio_play_sound(mus_level_4, 1, true);

}}
];
