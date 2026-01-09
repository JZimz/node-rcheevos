/**
 * RetroAchievements console identifiers.
 * Use these constants instead of magic numbers for better readability.
 *
 * @example
 * ```typescript
 * import { rhash, ConsoleId } from 'node-rcheevos';
 *
 * const md5 = rhash(ConsoleId.GAMEBOY, '/path/to/game.gb');
 * ```
 */
export const ConsoleId: {
  readonly UNKNOWN: 0;
  readonly MEGA_DRIVE: 1;
  readonly NINTENDO_64: 2;
  readonly SUPER_NINTENDO: 3;
  readonly GAMEBOY: 4;
  readonly GAMEBOY_ADVANCE: 5;
  readonly GAMEBOY_COLOR: 6;
  readonly NINTENDO: 7;
  readonly PC_ENGINE: 8;
  readonly SEGA_CD: 9;
  readonly SEGA_32X: 10;
  readonly MASTER_SYSTEM: 11;
  readonly PLAYSTATION: 12;
  readonly ATARI_LYNX: 13;
  readonly NEOGEO_POCKET: 14;
  readonly GAME_GEAR: 15;
  readonly GAMECUBE: 16;
  readonly ATARI_JAGUAR: 17;
  readonly NINTENDO_DS: 18;
  readonly WII: 19;
  readonly WII_U: 20;
  readonly PLAYSTATION_2: 21;
  readonly XBOX: 22;
  readonly MAGNAVOX_ODYSSEY2: 23;
  readonly POKEMON_MINI: 24;
  readonly ATARI_2600: 25;
  readonly MS_DOS: 26;
  readonly ARCADE: 27;
  readonly VIRTUAL_BOY: 28;
  readonly MSX: 29;
  readonly COMMODORE_64: 30;
  readonly ZX81: 31;
  readonly ORIC: 32;
  readonly SG1000: 33;
  readonly VIC20: 34;
  readonly AMIGA: 35;
  readonly ATARI_ST: 36;
  readonly AMSTRAD_PC: 37;
  readonly APPLE_II: 38;
  readonly SATURN: 39;
  readonly DREAMCAST: 40;
  readonly PSP: 41;
  readonly CDI: 42;
  readonly THREEDO: 43;
  readonly COLECOVISION: 44;
  readonly INTELLIVISION: 45;
  readonly VECTREX: 46;
  readonly PC8800: 47;
  readonly PC9800: 48;
  readonly PCFX: 49;
  readonly ATARI_5200: 50;
  readonly ATARI_7800: 51;
  readonly X68K: 52;
  readonly WONDERSWAN: 53;
  readonly CASSETTEVISION: 54;
  readonly SUPER_CASSETTEVISION: 55;
  readonly NEO_GEO_CD: 56;
  readonly FAIRCHILD_CHANNEL_F: 57;
  readonly FM_TOWNS: 58;
  readonly ZX_SPECTRUM: 59;
  readonly GAME_AND_WATCH: 60;
  readonly NOKIA_NGAGE: 61;
  readonly NINTENDO_3DS: 62;
  readonly SUPERVISION: 63;
  readonly SHARPX1: 64;
  readonly TIC80: 65;
  readonly THOMSONTO8: 66;
  readonly PC6000: 67;
  readonly PICO: 68;
  readonly MEGADUCK: 69;
  readonly ZEEBO: 70;
  readonly ARDUBOY: 71;
  readonly WASM4: 72;
  readonly ARCADIA_2001: 73;
  readonly INTERTON_VC_4000: 74;
  readonly ELEKTOR_TV_GAMES_COMPUTER: 75;
  readonly PC_ENGINE_CD: 76;
  readonly ATARI_JAGUAR_CD: 77;
  readonly NINTENDO_DSI: 78;
  readonly TI83: 79;
  readonly UZEBOX: 80;
  readonly FAMICOM_DISK_SYSTEM: 81;
  readonly HUBS: 100;
  readonly EVENTS: 101;
  readonly STANDALONE: 102;
};

/**
 * Valid console ID values for the rhash function.
 * This is the union of all values in the ConsoleId object.
 */
export type ConsoleIdValue = typeof ConsoleId[keyof typeof ConsoleId];

/**
 * Generate a hash for a ROM file using the RetroAchievements algorithm.
 *
 * @param consoleId - The RetroAchievements console ID
 * @param path - Path to the ROM file (required even when using buffer, for file extension detection)
 * @param buffer - Optional buffer containing ROM data. If provided, hashes from memory instead of reading file
 * @returns MD5 hash as a 32-character hex string
 * @throws Error if the file/buffer cannot be hashed
 *
 * @example
 * ```typescript
 * import { rhash, ConsoleId } from 'node-rcheevos';
 * import { readFileSync } from 'fs';
 *
 * // Hash from file using ConsoleId constant or use literal numbers
 * const md5 = rhash(ConsoleId.PSP, '/path/to/game.iso');
 *
 * // Hash from buffer (useful if already in memory)
 * const buffer = readFileSync('/path/to/game.iso');
 * const md5 = rhash(ConsoleId.PSP, '/path/to/game.iso', buffer);
 * ```
 */
export function rhash(consoleId: ConsoleIdValue, path: string, buffer?: Buffer): string;
