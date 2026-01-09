# node-rcheevos

[![npm version](https://badge.fury.io/js/node-rcheevos.svg)](https://www.npmjs.com/package/node-rcheevos)

Generate RetroAchievements hashes for ROMs in Node.js. Uses the same [rcheevos](https://github.com/RetroAchievements/rcheevos) C library that RetroArch uses, so your hashes will match exactly.

## Why not just reimplement the hashing in JavaScript?

I tried that first. Each console has its own special hashing rules - NES strips the iNES header, SNES might have a 512-byte header to skip, PlayStation has to parse `SYSTEM.CNF` to find which executable to hash, N64 needs byte-order conversion depending on the ROM format. The [RetroAchievements docs](https://docs.retroachievements.org/developer-docs/game-identification.html) explain all this, but keeping JavaScript implementations updated for 40+ systems when RA changes their logic is a pain. Easier to just wrap their C library directly.

Built this for [ROMie](https://github.com/JZimz/romie) but figured it's useful standalone.

## Installation
```bash
npm install node-rcheevos
```

Includes pre-built binaries for macOS, Windows, and Linux (both x64 and ARM64). If you're on something else, it'll build from source automatically.

## Quick Start
```javascript
const { rhash, ConsoleId } = require('node-rcheevos');

const md5 = rhash(ConsoleId.GAMEBOY, '/path/to/pokemon-red.gb');
console.log(md5); // "bb7df04e1b0a2570657527a7e108ae23"
```

## API

### `rhash(consoleId, path, buffer?)`

**Parameters:**
- `consoleId` (number): RetroAchievements console ID (use `ConsoleId` constants or numeric values)
- `path` (string): Path to your ROM file
- `buffer` (Buffer, optional): ROM data if you already have it in memory

**Returns:** MD5 hash as a lowercase hex string

**Throws:** Error if the file doesn't exist, can't be read, or the console ID is invalid

### `ConsoleId`

Exported constants for all console IDs if you prefer named constants over numbers.

```javascript
const { ConsoleId } = require('node-rcheevos');

console.log(ConsoleId.GAMEBOY);      // 4
console.log(ConsoleId.PLAYSTATION);  // 12
console.log(ConsoleId.PSP);          // 41
```

### Buffer limitations

**Works with buffers** (cartridge-based systems like GB, GBA, NES, SNES):
```javascript
const buffer = fs.readFileSync('/path/to/game.gb');
const md5 = rhash(ConsoleId.GAMEBOY, '/path/to/game.gb', buffer);
```

**Doesn't work with buffers** (disc-based like PlayStation, PSP, and arcade systems):
```javascript
// Passing a buffer will throw an error - must use file path
const md5 = rhash(ConsoleId.PLAYSTATION, '/path/to/game.bin');
```

Disc-based systems need to read specific sectors from the image file, and arcade systems hash the filename, so they can't work with in-memory buffers.

## CLI Usage
```bash
npx rhash -c 4 /path/to/game.gb
```

## Building from Source
```bash
git clone --recursive https://github.com/jzimz/node-rcheevos.git
cd node-rcheevos
npm install
npm run build
```

The `--recursive` flag is important - it pulls in the rcheevos library. Without it, you won't have anything to build against.

## License

MIT. The rcheevos library is also MIT.
