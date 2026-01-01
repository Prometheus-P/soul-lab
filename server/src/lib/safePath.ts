/**
 * Safe Path Utility
 *
 * Prevents path traversal attacks by validating that resolved paths
 * stay within the intended base directory.
 *
 * Issue #18: Path Traversal 방어
 */

import { resolve, relative, isAbsolute, normalize } from 'path';

/**
 * Dangerous path patterns that should be rejected
 */
const DANGEROUS_PATTERNS = [
  /\.\./,           // Parent directory traversal
  /\0/,             // Null byte injection
  /^\/etc\//i,      // System config
  /^\/proc\//i,     // Process info
  /^\/dev\//i,      // Device files
  /^~\//,           // Home directory expansion
  /^[a-zA-Z]:\\/,   // Windows absolute path
];

/**
 * Check if a path contains dangerous patterns
 */
export function hasDangerousPattern(inputPath: string): boolean {
  return DANGEROUS_PATTERNS.some(pattern => pattern.test(inputPath));
}

/**
 * Resolve a path safely within a base directory.
 *
 * @param baseDir - The base directory that the path must stay within
 * @param userInput - The user-provided path component
 * @returns The resolved absolute path
 * @throws Error if the resolved path would escape the base directory
 *
 * @example
 * safePath('/data', 'file.json') // => '/data/file.json'
 * safePath('/data', '../etc/passwd') // throws Error
 * safePath('/data', 'subdir/file.json') // => '/data/subdir/file.json'
 */
export function safePath(baseDir: string, userInput: string): string {
  // Reject obviously dangerous patterns early
  if (hasDangerousPattern(userInput)) {
    throw new PathTraversalError(
      `Path traversal attempt detected: ${userInput}`
    );
  }

  // Normalize and resolve both paths
  const normalizedBase = resolve(baseDir);
  const normalizedInput = normalize(userInput);

  // Resolve the combined path
  const resolvedPath = resolve(normalizedBase, normalizedInput);

  // Verify the resolved path is within the base directory
  const relativePath = relative(normalizedBase, resolvedPath);

  // If the relative path starts with '..' or is absolute, it's escaping
  if (
    relativePath.startsWith('..') ||
    isAbsolute(relativePath) ||
    relativePath.startsWith('/')
  ) {
    throw new PathTraversalError(
      `Path escapes base directory: ${userInput} resolves to ${resolvedPath}`
    );
  }

  return resolvedPath;
}

/**
 * Check if a path is safe without throwing
 */
export function isPathSafe(baseDir: string, userInput: string): boolean {
  try {
    safePath(baseDir, userInput);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize a filename by removing dangerous characters.
 * Use this for user-provided filenames (not paths).
 *
 * @param filename - The filename to sanitize
 * @returns Sanitized filename
 *
 * @example
 * sanitizeFilename('my_file.json') // => 'my_file.json'
 * sanitizeFilename('../../../etc/passwd') // => 'etcpasswd'
 * sanitizeFilename('file<script>.json') // => 'filescript.json'
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and dangerous characters
  return filename
    .replace(/[/\\]/g, '')           // Remove slashes
    .replace(/\.\./g, '')            // Remove parent directory
    .replace(/[<>:"|?*\x00-\x1f]/g, '') // Remove Windows invalid chars
    .replace(/^\.+/, '')             // Remove leading dots
    .trim();
}

/**
 * Custom error for path traversal attempts
 */
export class PathTraversalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PathTraversalError';
  }
}
