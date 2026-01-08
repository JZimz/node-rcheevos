/**
 * Generate a hash for a ROM file using the RetroAchievements algorithm.
 *
 * @param consoleId - The RetroAchievements console ID (e.g., 41 for PSP)
 * @param path - Path to the ROM file (required even when using buffer, for file extension detection)
 * @param buffer - Optional buffer containing ROM data. If provided, hashes from memory instead of reading file
 * @returns MD5 hash as a 32-character hex string
 * @throws Error if the file/buffer cannot be hashed
 *
 * @example
 * ```typescript
 * import { rhash } from 'node-rcheevos';
 * import { readFileSync } from 'fs';
 *
 * // Hash from file
 * const md5 = rhash(41, '/path/to/game.iso');
 *
 * // Hash from buffer (useful if already in memory)
 * const buffer = readFileSync('/path/to/game.iso');
 * const md5 = rhash(41, '/path/to/game.iso', buffer);
 * ```
 */
export function rhash(consoleId: number, path: string, buffer?: Buffer): string;
