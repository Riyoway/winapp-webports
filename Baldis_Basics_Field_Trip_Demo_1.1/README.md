# Baldi's Basics Field Trip Demo 1.1 â€” WebGL

Restored from the supplied Windows Mono release (Unity 2018.2.0f2), rebuilt with
Unity 2019.4.17f1. The four original scenes, sprites, audio, navigation data,
and recovered C# gameplay are included. Original artwork and notices remain.
Company/product/version retain the Windows values: `Basically, Games!`,
`Baldi's Basics Field Trip Demo 1.1`, and `1.1`.

## Run

Double-click `start.bat` on Windows. Python 3 is required. Keep the server window
open while playing. Alternatively, serve this directory over HTTP and open
`index.html`; opening it directly with `file://` is unsupported. Reload once
with F5 if an older build was already open. The launcher uses local port 57322.

Press a key on the introduction to start. Use WASD to move, the mouse to look,
Shift to run, and left click to collect nearby sticks or feed the campfire.
R drops carried sticks. Escape pauses/resumes; holding Escape for one second
performs the original quit action. Click the game to enable audio and mouse capture.
The school bus leads to the three-minute camping game.

## Browser compatibility

All runtime files are local. Unity analytics and automatic reporting are disabled.
The canvas fills the window, with a black loading screen and one 240Ã—3px bar.
Sprite fog/transparency uses compatible shader source. An unsuccessful Bully-tree
raycast is guarded before reading its hit object, preventing the original null
reference exception. Quit stops pending game timers and render callbacks and clears the game display.

This is a recovered Unity project, not the original development source. Rendering
can differ from the Windows release. Full completion and mobile controls have
not been tested. Mouse capture in a normal desktop browser could not be verified
because the desktop automation runtime failed to initialize.

## Verification

The final browser build was checked with cache disabled: school movement,
transition to the camping scene, rendered trees/Baldi, pause and resume, and
active audio output. No runtime exceptions, automatic external requests,
WebSockets, or popups were observed. Screenshots and verification evidence
are kept in the corresponding `create/.work/` directory.

## Rebuild

The restored project and `build.ps1` are under
`create/.work/Baldi's Basics Field Trip Demo_1.1/` (`UnityProject/` contains the Unity project).
Run `build.ps1` with Unity 2019.4.17f1 and WebGL support. It builds in a temporary
directory and backs up an existing browser output before replacing files.

The original Windows release is unchanged. Original-file inventories, unmodified
exports, and pre-edit backups are in
`C:\Users\Riyo\AppData\Local\Temp\codex-baldi-demos-20261007`.
