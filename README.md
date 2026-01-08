# node-rcheevos

> **⚠️ Work in Progress** - This works and I'm using it in ROMie, but it's early. Only macOS ARM64 binaries are pre-built right now. Other platforms will compile from source (need build tools) until I set up CI for cross-platform builds.

Generate RetroAchievements hashes for ROMs in Node.js. Uses the official [rcheevos](https://github.com/RetroAchievements/rcheevos) C library, so you get the same hashes as RetroArch and other emulators.

Built this for better RetroAchievements support in [ROMie](https://github.com/JZimz/romie), but it works anywhere you need to hash ROMs in Node.

## Why this exists

If you've tried adding RetroAchievements to an Electron app, you've probably hit this: WASM libraries don't work in the main process. And reimplementing the hashing logic in JavaScript is a recipe for subtle bugs when the algorithm changes.

This wraps the official C library as a native Node addon, so it just works. Same hashing logic as the source of truth, supports all the systems RetroAchievements does (Game Boy, NES, SNES, PlayStation, PSP, you name it).

## Install

```bash
npm install node-rcheevos
```

Comes with pre-built binaries for macOS, Windows, and Linux (both x64 and ARM64). If you're on something else, it'll build from source—just need the usual build tools (node-gyp stuff).

## How to use it

```javascript
const { rhash } = require('node-rcheevos');

const md5 = rhash(4, '/path/to/game.gb');  // Game Boy
console.log(md5);  // "a1b2c3d4e5f6..."
```

TypeScript works too:

```typescript
import { rhash } from 'node-rcheevos';

const md5 = rhash(41, '/path/to/game.iso');  // PSP
```

CLI if you want to test it quick:

```bash
npx rhash -c 4 /path/to/game.gb
```

## API

Just one function: `rhash(consoleId, path, buffer?)`

Pass it a RetroAchievements console ID (see table below) and the path to your ROM. Returns the MD5 hash as a string. Throws an error if the file doesn't exist or can't be hashed.

## Console IDs

Here are the common ones (full list at [docs.retroachievements.org](https://docs.retroachievements.org/Console-IDs/)):

| ID | System |
|----|--------|
| 1  | Genesis/Mega Drive |
| 2  | Nintendo 64 |
| 3  | Super Nintendo |
| 4  | Game Boy |
| 5  | Game Boy Advance |
| 6  | Game Boy Color |
| 7  | NES/Famicom |
| 11 | Game Gear |
| 12 | PlayStation |
| 27 | PlayStation Portable |
| 38 | Nintendo 3DS |
| 39 | Dreamcast |

## Building from source

If you want to hack on it:

```bash
git clone --recursive https://github.com/jzimz/node-rcheevos.git
cd node-rcheevos
npm install
npm run build
```

The `--recursive` flag pulls in the rcheevos submodule. Without it, you won't have the C library to build against.

## License

MIT. The rcheevos library this wraps is also MIT.
