#!/usr/bin/env node

const { rhash } = require('../lib/index.js');
const path = require('path');

function printUsage() {
  console.log('Usage: rhash -c <consoleId> <path>');
  console.log('');
  console.log('Options:');
  console.log('  -c, --console <id>    RetroAchievements console ID');
  console.log('');
  console.log('Examples:');
  console.log('  rhash -c 4 game.gb              # Game Boy');
  console.log('  rhash --console 12 game.bin     # PlayStation');
  console.log('');
  console.log('Common console IDs:');
  console.log('  1  - Sega Genesis/Mega Drive');
  console.log('  2  - Nintendo 64');
  console.log('  3  - Super Nintendo');
  console.log('  4  - Game Boy');
  console.log('  5  - Game Boy Advance');
  console.log('  7  - NES/Famicom');
  console.log('  12 - PlayStation');
  console.log('  27 - PlayStation Portable');
  process.exit(1);
}

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
  printUsage();
}

let consoleId;
let romPath;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '-c' || args[i] === '--console') {
    consoleId = parseInt(args[i + 1], 10);
    i++;
  } else if (!romPath) {
    romPath = args[i];
  }
}

if (!consoleId || !romPath) {
  console.error('Error: Both console ID and ROM path are required\n');
  printUsage();
}

if (isNaN(consoleId)) {
  console.error('Error: Console ID must be a number\n');
  printUsage();
}

const absolutePath = path.resolve(romPath);

try {
  const result = rhash(consoleId, absolutePath);
  console.log(result);
  process.exit(0);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
