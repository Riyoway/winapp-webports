# DeathForest — WebGL

Browser restoration of the Windows release of **DeathForest: Escape from the Forest [Proliferation]**, by Kazz. The supplied Windows readme identifies version **1.03**. The original company/product names, `Dreamer` / `TheDeathForest`, are retained.

## Run

Serve this directory over HTTP or HTTPS and open `index.html`. Opening the file directly with `file://` is unsupported. WebGL 2 is required.

From the archive's `Private` directory:

```powershell
python .agent-tools/serve.py "create/DeathForest" 58629
```

Then open `http://127.0.0.1:58629/`.

Use W/S to move forward/backward, A/D to turn, and the mouse to aim the camera and flashlight. Press P to pause/resume. Collect the four motorcycle parts, open the escape fence, and return to the motorcycle. During the motorcycle escape, use A/D to steer. The ending's original G shortcut skips back to the title.

The flashlight uses batteries. Collected memories unlock the original bonus gallery; its flags are saved in browser storage for this URL. The title's Quit command stops the game; reload the page to restart it.

## Restoration

The original Unity 4.3.2f1 scenes, textures, sounds, animations, fonts, and managed UnityScript game code were extracted from the Windows player. The recovered code was converted to C# and adapted to Unity 2019.4.17f1 for WebGL. All 121 exported meshes were rebuilt from the original vertex data, including UVs, bind poses, and skin weights. All 35 materials have their original texture references, colors, and supported shader values restored. Legacy camera projection and invalid quality defaults were corrected. The original gameplay, bonus gallery, cast, and ending credits are retained.

Recovered shaders use compatible built-in or local replacements, with forward rendering for the flashlight and other dynamic lights. Original Animation components use legacy clips. Lighting, foliage, and material effects can differ from the Windows player. This is a restored project, not the original development source.

Unity 4 CharacterControllers do not serialize an enabled flag. Their enabled state was restored explicitly for the player and enemies after extraction; the original movement and grounding code is retained.

All runtime files are local. Unity analytics and automatic reporting are disabled. The loader uses a black full-window canvas and one centered progress bar.

The 31 original audio clips were recovered from embedded Unity 4 audio and the original `.resS` streams. Audio references retain their original GUIDs, use the imported-audio reference type, and have nonzero samples. Modern audio voice limits are set to 32 real and 512 virtual voices. Yoshie's billboard uses a local programmable replacement for the original fixed-function vertex-lit shader, preserving double-sided drawing, emission RGB, and texture alpha.

## Rebuild

The restored Unity project and build script are in `../.work/DeathForest/`. Run its `build.ps1` with Unity 2019.4.17f1 and the matching WebGL module. The script builds in a temporary directory, backs up an existing browser build, and regenerates the file manifest.

`UnityProject/Assets/Editor/OriginalMeshes.json` contains original mesh geometry used by the Editor-only restoration step. `WebVerification.Run` is an Editor-only integration check that repositions the player to original triggers and restores the prior Editor save afterwards. Neither test controls nor unlocked saves are included in the browser game.

## Verification

The initial Chromium check covered loading, starting a game, forward movement, turning, pause/resume, gallery navigation, return to the title, and Quit. The PlayerPrefs file was present in IndexedDB after a page reload. After restoring the audio and billboard, the browser's actual output samples were measured through a pass-through Web Audio analyser: title peak 0.2621 and gameplay peak 0.3080. Yoshie was visible after its normal spawn and approached the player in the game. No automatic external requests, WebSockets, popups, or JavaScript runtime exceptions were observed. The analyser belongs to the test harness and is not part of the shipped page.

Editor integration exercised the four item triggers, the escape gate, a memory pickup and saved unlock, motorcycle handoff, tunnel escape, the original ending credits, and the GameOver countdown. Original geometry, textures, Japanese fonts, and legacy clips were checked. The audio checks confirmed all 31 clips contain playable samples and the title/gameplay sound references resolve correctly. An isolated render changed from zero visible pixels with the old shader to 16,463 with the fixed Yoshie shader. The built data was re-read successfully; all six CharacterControllers remain enabled. All 37 original Windows files match their initial SHA-256 hashes.

See the restored workspace's `verification/` folder for the final browser audit, screenshots, and Editor integration results. A complete playthrough along the natural route, collecting and reloading an unlocked memory in the browser, mobile controls, and audible playback are not verified. Chromium emitted WebGL capability warnings and an Emscripten advisory about the original fixed 60 fps loop; these did not prevent the checked interactions.

The original Windows files were left unchanged and compared with their initial SHA-256 inventory. A browser that opened an earlier build may need one reload with F5.
