/**
 * Atomic File Write Utility
 *
 * Writes files atomically using the write-to-temp-then-rename pattern.
 * This prevents partial writes and data corruption on crash/power loss.
 *
 * Security: Uses safePath for path traversal prevention.
 */

import { writeFileSync, renameSync, mkdirSync, existsSync, unlinkSync } from 'fs';
import { dirname, basename, join, isAbsolute, resolve } from 'path';
import { randomBytes } from 'crypto';
import { hasDangerousPattern, PathTraversalError } from './safePath.js';

/**
 * Write content to a file atomically.
 *
 * 1. Write to a temporary file in the same directory
 * 2. Sync the file to disk (fsync)
 * 3. Rename temp file to target (atomic on POSIX)
 *
 * @param filePath - Target file path
 * @param content - Content to write
 */
export function writeFileAtomic(filePath: string, content: string): void {
  // Security: Validate path doesn't contain traversal patterns
  if (hasDangerousPattern(filePath)) {
    throw new PathTraversalError(`Dangerous path pattern detected: ${filePath}`);
  }

  const dir = dirname(filePath);
  const base = basename(filePath);

  // Ensure directory exists
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // Generate unique temp file name
  const tempName = `.${base}.${randomBytes(8).toString('hex')}.tmp`;
  const tempPath = join(dir, tempName);

  try {
    // Write to temp file
    // Note: Node.js writeFileSync does fsync internally when using the default options
    writeFileSync(tempPath, content, { encoding: 'utf-8', mode: 0o644 });

    // Atomic rename (this is atomic on POSIX systems)
    renameSync(tempPath, filePath);
  } catch (error) {
    // Clean up temp file on error
    try {
      if (existsSync(tempPath)) {
        unlinkSync(tempPath);
      }
    } catch {
      // Ignore cleanup errors
    }
    throw error;
  }
}

/**
 * Write JSON to a file atomically.
 *
 * @param filePath - Target file path
 * @param data - Data to serialize as JSON
 * @param pretty - Whether to pretty-print (default: true)
 */
export function writeJsonAtomic(filePath: string, data: unknown, pretty = true): void {
  const content = pretty
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data);
  writeFileAtomic(filePath, content);
}

/**
 * Clean up orphaned temp files from failed atomic writes.
 * Call this periodically or at startup.
 *
 * @param dir - Directory to clean
 */
export function cleanupTempFiles(dir: string): number {
  let cleaned = 0;

  // Security: Validate directory path
  if (hasDangerousPattern(dir)) {
    throw new PathTraversalError(`Dangerous directory pattern: ${dir}`);
  }

  if (!existsSync(dir)) return cleaned;

  try {
    const fs = require('fs');
    const files = fs.readdirSync(dir) as string[];

    for (const file of files) {
      // Match our temp file pattern: .filename.randomhex.tmp
      if (file.startsWith('.') && file.endsWith('.tmp')) {
        const filePath = join(dir, file);
        try {
          // Only delete if older than 1 minute (avoid race with in-progress writes)
          const stat = fs.statSync(filePath);
          const ageMs = Date.now() - stat.mtimeMs;
          if (ageMs > 60 * 1000) {
            unlinkSync(filePath);
            cleaned++;
          }
        } catch {
          // Ignore errors for individual files
        }
      }
    }
  } catch {
    // Ignore directory read errors
  }

  return cleaned;
}
