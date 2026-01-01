/**
 * Safe Path Tests
 *
 * Tests for path traversal prevention.
 * Issue #18: Path Traversal 방어
 */

import { describe, it, expect } from 'vitest';
import {
  safePath,
  isPathSafe,
  sanitizeFilename,
  hasDangerousPattern,
  PathTraversalError,
} from './safePath.js';

describe('Path Traversal Prevention', () => {
  const baseDir = '/data/app';

  describe('safePath', () => {
    it('should allow simple filenames', () => {
      expect(safePath(baseDir, 'file.json')).toBe('/data/app/file.json');
    });

    it('should allow nested paths within base', () => {
      expect(safePath(baseDir, 'subdir/file.json')).toBe('/data/app/subdir/file.json');
    });

    it('should allow deeply nested paths', () => {
      expect(safePath(baseDir, 'a/b/c/file.json')).toBe('/data/app/a/b/c/file.json');
    });

    it('should reject parent directory traversal', () => {
      expect(() => safePath(baseDir, '../file.json'))
        .toThrow(PathTraversalError);
    });

    it('should reject multiple parent traversal', () => {
      expect(() => safePath(baseDir, '../../etc/passwd'))
        .toThrow(PathTraversalError);
    });

    it('should reject traversal within path', () => {
      expect(() => safePath(baseDir, 'subdir/../../../etc/passwd'))
        .toThrow(PathTraversalError);
    });

    it('should reject null byte injection', () => {
      expect(() => safePath(baseDir, 'file.json\x00.txt'))
        .toThrow(PathTraversalError);
    });

    it('should reject absolute paths to sensitive locations', () => {
      expect(() => safePath(baseDir, '/etc/passwd'))
        .toThrow(PathTraversalError);
    });

    it('should reject URL-encoded traversal attempts with .. pattern', () => {
      // Even URL-encoded strings are rejected if they contain '..'
      // This is defense-in-depth - strict is safer
      expect(() => safePath(baseDir, '..%2F..%2Fetc%2Fpasswd'))
        .toThrow(PathTraversalError);
    });

    it('should reject double-encoded traversal with .. pattern', () => {
      // Contains '..' pattern, so rejected even though %252F stays encoded
      expect(() => safePath(baseDir, '..%252F..%252Fetc'))
        .toThrow(PathTraversalError);
    });

    it('should allow safe encoded characters', () => {
      // No '..' pattern - just encoded slashes in middle
      expect(safePath(baseDir, 'file%2Ftest.json')).toBe('/data/app/file%2Ftest.json');
    });

    it('should reject Windows-style traversal', () => {
      expect(() => safePath(baseDir, '..\\..\\windows\\system32'))
        .toThrow(PathTraversalError);
    });

    it('should normalize ./current directory refs', () => {
      expect(safePath(baseDir, './file.json')).toBe('/data/app/file.json');
    });

    it('should handle empty input', () => {
      expect(safePath(baseDir, '')).toBe('/data/app');
    });
  });

  describe('isPathSafe', () => {
    it('should return true for safe paths', () => {
      expect(isPathSafe(baseDir, 'file.json')).toBe(true);
      expect(isPathSafe(baseDir, 'subdir/file.json')).toBe(true);
    });

    it('should return false for unsafe paths', () => {
      expect(isPathSafe(baseDir, '../file.json')).toBe(false);
      expect(isPathSafe(baseDir, '../../etc/passwd')).toBe(false);
      expect(isPathSafe(baseDir, '/etc/passwd')).toBe(false);
    });
  });

  describe('hasDangerousPattern', () => {
    it('should detect parent directory traversal', () => {
      expect(hasDangerousPattern('../file')).toBe(true);
      expect(hasDangerousPattern('a/../b')).toBe(true);
      expect(hasDangerousPattern('..\\..\\file')).toBe(true);
    });

    it('should detect null bytes', () => {
      expect(hasDangerousPattern('file\x00.txt')).toBe(true);
    });

    it('should detect system paths', () => {
      expect(hasDangerousPattern('/etc/passwd')).toBe(true);
      expect(hasDangerousPattern('/proc/self/environ')).toBe(true);
      expect(hasDangerousPattern('/dev/null')).toBe(true);
    });

    it('should detect home directory expansion', () => {
      expect(hasDangerousPattern('~/secret')).toBe(true);
    });

    it('should detect Windows absolute paths', () => {
      expect(hasDangerousPattern('C:\\Windows')).toBe(true);
      expect(hasDangerousPattern('D:\\secret')).toBe(true);
    });

    it('should allow normal paths', () => {
      expect(hasDangerousPattern('file.json')).toBe(false);
      expect(hasDangerousPattern('subdir/file.json')).toBe(false);
      expect(hasDangerousPattern('my-file_123.txt')).toBe(false);
    });
  });

  describe('sanitizeFilename', () => {
    it('should preserve safe filenames', () => {
      expect(sanitizeFilename('file.json')).toBe('file.json');
      expect(sanitizeFilename('my-file_123.txt')).toBe('my-file_123.txt');
    });

    it('should remove directory separators', () => {
      expect(sanitizeFilename('path/to/file.txt')).toBe('pathtofile.txt');
      expect(sanitizeFilename('path\\to\\file.txt')).toBe('pathtofile.txt');
    });

    it('should remove parent directory patterns', () => {
      expect(sanitizeFilename('../../../etc/passwd')).toBe('etcpasswd');
    });

    it('should remove leading dots', () => {
      expect(sanitizeFilename('.htaccess')).toBe('htaccess');
      expect(sanitizeFilename('..htaccess')).toBe('htaccess');
    });

    it('should remove special characters', () => {
      expect(sanitizeFilename('file<script>.json')).toBe('filescript.json');
      expect(sanitizeFilename('file|test.txt')).toBe('filetest.txt');
      expect(sanitizeFilename('file?query.txt')).toBe('filequery.txt');
    });

    it('should handle edge cases', () => {
      expect(sanitizeFilename('')).toBe('');
      expect(sanitizeFilename('   file.txt   ')).toBe('file.txt');
    });
  });

  describe('Attack Vectors', () => {
    // Real-world attack patterns

    it('should block /etc/passwd access', () => {
      expect(isPathSafe(baseDir, '../../../etc/passwd')).toBe(false);
      expect(isPathSafe(baseDir, '/etc/passwd')).toBe(false);
    });

    it('should block proc filesystem access', () => {
      expect(isPathSafe(baseDir, '/proc/self/environ')).toBe(false);
      expect(isPathSafe(baseDir, '../../../proc/version')).toBe(false);
    });

    it('should block Windows system files', () => {
      expect(isPathSafe(baseDir, '..\\..\\windows\\system.ini')).toBe(false);
      expect(isPathSafe(baseDir, 'C:\\Windows\\System32\\config\\SAM')).toBe(false);
    });

    it('should block null byte bypass attempts', () => {
      expect(isPathSafe(baseDir, 'file.txt\x00.jpg')).toBe(false);
      expect(isPathSafe(baseDir, '../\x00../etc')).toBe(false);
    });

    it('should handle obfuscated traversal', () => {
      // These are literal strings after URL decoding
      expect(isPathSafe(baseDir, '....//....//etc')).toBe(false);
      expect(isPathSafe(baseDir, '..././..././etc')).toBe(false);
    });
  });
});
