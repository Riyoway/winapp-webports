# Buzz Lightyear Horror Game — WebGL

Browser restoration of the Windows IL2CPP release using Unity 2020.1.0f1. The game's internal version is 0.1, with `NA Games` / `Buzz Lightyear Horror Game` retained as the company and product names.

## Run

Serve this directory over HTTP or HTTPS and open `index.html`. Opening the file directly with `file://` is unsupported.

From the archive's `Private` directory:

```powershell
python .agent-tools/serve.py "create/Buzz Lightyear Horror Game" 58627
```

Then open `http://127.0.0.1:58627/`.

Use WASD or the arrow keys to move, Shift to run, and the mouse to look around. Click the game to capture the mouse. Press E, F, or the left mouse button to open a nearby door. Escape opens the original settings menu and releases the mouse. The objective is to collect all 15 flags. Music and Buzz's size are saved for this browser and URL. `Sair` stops the game; reload the page to restart it.

## Restoration

The original scene geometry, textures, audio, animations, UI, and navigation data were extracted from the Windows release. Game-specific methods were reconstructed against the native executable. The original author link remains available through `Creditos`.

HDRP and Visual Effect Graph require rendering features unavailable in this WebGL target. Materials, lights, fog, bloom, vignette, and the particle effect use compatible replacements. Lighting and effects can differ from the Windows release. This is a restored project, not the original development source.

The original two-sided wall and flag materials retain their texture tiling and normal maps. Enemy contact plays the original video from a local MP4 in `StreamingAssets`, then restarts the game after four seconds.

Buzz automatically opens closed doors along his navigation path during patrol and pursuit. An open door stays open when he approaches it.

All runtime files are local. Unity analytics and automatic reporting are disabled. The author page is opened only by an explicit click.

## Rebuild

The restored Unity project and build script are in `../.work/Buzz Lightyear Horror Game/`. Run its `build.ps1` with Unity 2020.1.0f1 and the matching WebGL module. The script builds in a temporary directory and backs up an existing browser build before replacing its files.

Legacy post-processing runtime source comes from [Unity Technologies' PostProcessing v1](https://github.com/Unity-Technologies/PostProcessing/tree/v1), under the MIT license in `LICENSES.txt` and the restored workspace.

## Verification

Earlier browser checks covered the menu, starting play, movement, pause, and settings persistence across reloads. This update also checked the restored walls, movement to Buzz, the contact-triggered scene transition, and the local MP4 request with caching disabled. No runtime errors, automatic external requests, WebSockets, or popups were observed. The original author link was not opened during these tests.

An Editor play-mode check exercised the real physics triggers for enemy contact, video decoding, the four-second restart, and all 15 flags, followed by the return to the menu. It also checked all 37 wall renderers, compared two-sided and single-sided rendering, and checked a door toggle and enemy placement on the navigation mesh. The check repositions the player.

The final timing update explicitly prepares the video before starting playback and the four-second timer. Its WebGL build and serialized data were checked; an additional browser playthrough was omitted at the user's request. A complete natural-route playthrough, mobile controls, and audible playback have not been verified.

Verification evidence is in the restored workspace's `verification/` folder. The original Windows files were left unchanged and checked against their initial SHA-256 inventory. A browser that previously opened an earlier build may need one reload with F5.

The door update passed an Editor play-mode check using the actual enemy update and navigation: all six room doors opened automatically and were crossed from both sides with both Buzz sizes (24 cases). Each door remained open afterward. The fixture places Buzz on opposite sides of each door; it does not invoke the door-opening method directly.

Build 11 also passed a cache-disabled browser check of the loading bar, menu, gameplay start, and movement, with no automatic external requests, WebSockets, popups, or runtime errors. The automatic door opening was checked in Editor play mode and was not visually captured during this browser check.
