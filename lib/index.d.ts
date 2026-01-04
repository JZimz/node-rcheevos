/**
 * Generate a hash for a ROM file using the RetroAchievements algorithm.
 *
 * @param consoleId - The RetroAchievements console ID (e.g., 41 for PSP)
 * @param path - Absolute path to the ROM file
 * @returns MD5 hash as a 32-character hex string
 * @throws Error if the file cannot be read or hashed
 *
 * @example
 * ```typescript
 * import { hash } from 'node-rcheevos';
 *
 * const md5 = hash(41, '/path/to/game.iso'); // PSP
 * console.log(md5); // "a1b2c3d4e5f6..."
 * ```
 */
export function hash(consoleId: number, path: string): string;
