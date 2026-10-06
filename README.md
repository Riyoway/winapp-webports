# Windows Game Web Ports

A collection of browser ports and restorations of Windows games, packaged with local runtime files.

## Games

| Game | Files | Notes |
| --- | --- | --- |
| Baldi's Basics Gangnam Style Takeover | [Open game folder](./Baldis_Basics_Gangnam_Style_Takeover/) | Unity WebGL build based on Baldi's Basics Classic. |
| DeathForest | [Open game folder](./DeathForest/) · [Details](./DeathForest/README.md) | Browser restoration of DeathForest: Escape from the Forest [Proliferation] v1.03 by Kazz. Requires WebGL 2. |

## Running the Games

Serve the repository through an HTTP or HTTPS server, then open the game's `index.html` in a browser. Opening the files directly with `file://` is unsupported.

For example, with Python installed, run this command from the repository root:

```sh
python -m http.server 8000
```

Then open one of these addresses:

- [Baldi's Basics Gangnam Style Takeover](http://localhost:8000/Baldis_Basics_Gangnam_Style_Takeover/)
- [DeathForest](http://localhost:8000/DeathForest/)

Browser saves are tied to the site's origin and game path. Use the same address to keep accessing existing saves.

## Copyright and Credits

All games, characters, artwork, music, sound effects, and other original content are copyrighted by their respective creators and rights holders. Any third-party modifications and runtime components remain the property of their respective authors.

- **Baldi's Basics:** the original game is by Basically Games. The Gangnam Style Takeover modification and any additional content belong to their respective creators.
- **DeathForest:** the original game is by Kazz. The restored build retains the original game's credits.
- **Unity:** Unity and its associated trademarks belong to Unity Technologies. Unity runtime components are subject to their applicable terms.

This repository does not claim ownership of the original games or third-party content. Browser porting and restoration do not transfer those rights. Inclusion here does not grant permission to reuse or redistribute third-party content; obtain any required permission from the relevant rights holders.

This is an independent project and is not affiliated with or endorsed by the original creators or Unity Technologies. No blanket license is granted for the repository's game content.
