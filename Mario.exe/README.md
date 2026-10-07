# Mario.EXE

A browser reconstruction of CoolRash's 2015 GameMaker game, using the sprites,
audio, object definitions, room layouts, and recovered GML from the supplied
Windows executable. The original artwork and developer splash are preserved.

## Running

On Windows, double-click `start.bat`. It starts a local server and opens the
game in your default browser. Keep the launcher window open while playing;
close it or press Ctrl+C when finished. Python 3 is required.

Serve this directory over HTTP and open `index.html` in a modern desktop browser.
All resources are local; no CDN or online service is required. From the Private
workspace, one option is:

```powershell
python .agent-tools/serve.py create/Mario.exe 8000
```

Then open `http://127.0.0.1:8000/`. Reload once after replacing an older build.

## Controls

- Menu: Up/Down, then Enter. Select **2 LUIGI** to start. The **1 MARIO** option
  plays the original sound without starting a level.
- Move: Left/Right. Jump: Up. Run: hold Shift.
- Struggle prompt: repeatedly press F.
- Final death screen: Escape restarts the game.

The castle escape is timing-sensitive. Holding Shift + Right during the
cutscene starts the sprint on the first controllable step.

Sound becomes available after the first click or key press, as required by
browser autoplay restrictions.

## Restoration

The executable is a self-extracting CAB containing a GameMaker bytecode-14
`data.win`, a native runner, and external OGG files. UndertaleModTool recovered
all 192 code entries, 91 sprites, 91 object types, 18 rooms, seven timelines,
one bitmap font, 19 texture sheets, and 35 sounds. There are 15,178 placed
instances across the original rooms.

Direct execution and bytecode conversion with a local GameMaker WASM runner
failed during resource initialization. This build instead adapts the recovered
GML events to JavaScript instance scopes and implements their required drawing,
collision, camera, alarm, timeline, keyboard, and audio behavior in the browser.
It is a reconstructed port rather than an original GameMaker HTML5 export.
Built-in particle effects use browser approximations. Exact native frame timing
and every pixel have not been compared against a running Windows build.

## Verification

- Loaded and rendered all 18 rooms.
- Started through the menu; tested movement, jumping, and landing with browser input.
- Decoded all 35 sounds and measured nonzero output from the playing level BGM.
- Passed 29 gameplay checks covering cutscenes, traps, retry, the F struggle's
  success/failure paths, camera changes, the sword chase, and ending transitions.
  These checks use original collision targets and advance simulation frames;
  they do not represent a complete manual playthrough.
- Passed 16 additional checks for hill/pipe/castle draw order, image/audio loading,
  and the castle escape from four starting positions. Equal-depth sprites use
  the legacy runner's reverse creation order. Solid collisions retry movement
  with the velocity set by the event, including the falling spikes' rebound.
- Rotated collision masks follow sprite rotation. Verified stage 3 movement,
  jumping, and landing with browser keyboard input after its original life
  screen; its horizontal entrance pipe still blocks walking into it.
- Checked JavaScript syntax and resource references. Texture sheets and external
  OGG files match the extracted originals; the supplied executable is unchanged.
- No automatic external requests, WebSockets, or popups.

Source executable SHA-256:
`dd95deed20e62e9fd3b9af8143d6800ca68a13b09d98c7988c847d98528a6337`

Extraction, decompilation, experimental runner files, and verification evidence
are separate from this playable folder. Runtime file hashes are listed in
`local-manifest.json`.
