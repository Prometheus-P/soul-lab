/**
 * Prompt Security - AI Prompt Injection Defense
 *
 * Sanitizes user inputs before they're inserted into AI prompts.
 * Prevents prompt injection attacks by filtering malicious patterns.
 */

import { logger } from './logger.js';

// ============================================================
// Configuration
// ============================================================

/** Maximum allowed length for user questions */
export const MAX_QUESTION_LENGTH = 1000;

/** Maximum allowed length for general user input in prompts */
export const MAX_INPUT_LENGTH = 2000;

// ============================================================
// Malicious Pattern Detection
// ============================================================

/**
 * Patterns that indicate prompt injection attempts.
 * Matched case-insensitively.
 */
const INJECTION_PATTERNS: RegExp[] = [
  // Direct instruction override attempts
  /ignore\s+(previous|above|all|prior)\s+(instructions?|prompts?|rules?)/i,
  /disregard\s+(previous|above|all|prior|all\s+prior)\s+(instructions?|prompts?|rules?)/i,
  /forget\s+(previous|above|all|prior)\s+(instructions?|prompts?|rules?)/i,
  /override\s+(previous|above|all|prior)\s+(instructions?|prompts?|rules?)/i,
  /do\s+not\s+follow\s+(previous|above|all|prior)/i,
  /disregard\s+all\s+prior\s+rules/i,

  // Korean injection patterns
  /이전\s*지시(사항|를)?\s*(무시|잊어|따르지)/i,
  /위의?\s*(지시|명령|규칙)\s*(무시|잊어)/i,
  /시스템\s*프롬프트\s*.*(무시|변경|출력|보여|알려)/i,

  // Role manipulation
  /you\s+are\s+(now|no\s+longer)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(if|though)/i,
  /당신은\s*이제\s*(?!운세|점성술|타로)/i, // Allow fortune-related, block others

  // System prompt extraction
  /what\s+(is|are)\s+your\s+(system\s+)?prompt/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?prompt/i,
  /print\s+(your\s+)?(system\s+)?prompt/i,
  /reveal\s+(your\s+)?(system\s+)?instructions/i,
  /시스템\s*프롬프트\s*(알려|보여|출력)/i,

  // Code execution attempts
  /```(?:python|javascript|bash|sh|exec)/i,
  /<script\b/i,
  /\$\{.*\}/i, // Template literal injection

  // Delimiter manipulation
  /###\s*(system|user|assistant)/i,
  /\[INST\]/i,
  /<<SYS>>/i,
  /<\|im_start\|>/i,
];

/**
 * Characters/sequences that should be escaped in prompts
 */
const ESCAPE_MAP: Record<string, string> = {
  '\\': '\\\\',
  '"': '\\"',
  '\n': ' ',
  '\r': ' ',
  '\t': ' ',
};

// ============================================================
// Sanitization Functions
// ============================================================

export interface SanitizeResult {
  sanitized: string;
  originalLength: number;
  wasTruncated: boolean;
  injectionAttemptDetected: boolean;
  detectedPatterns: string[];
}

/**
 * Sanitize user input for safe inclusion in AI prompts.
 *
 * @param input - Raw user input
 * @param maxLength - Maximum allowed length (default: MAX_QUESTION_LENGTH)
 * @returns Sanitized result with metadata
 */
export function sanitizeForPrompt(
  input: string,
  maxLength: number = MAX_QUESTION_LENGTH
): SanitizeResult {
  const originalLength = input.length;
  const detectedPatterns: string[] = [];

  // 1. Check for injection patterns
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      detectedPatterns.push(pattern.source.slice(0, 30) + '...');
    }
  }

  // 2. Truncate if too long
  let sanitized = input.length > maxLength
    ? input.slice(0, maxLength)
    : input;

  // 3. Escape special characters
  sanitized = sanitized
    .split('')
    .map((char) => ESCAPE_MAP[char] || char)
    .join('');

  // 4. Remove excessive whitespace
  sanitized = sanitized
    .replace(/\s{3,}/g, '  ')  // Collapse 3+ whitespace to 2
    .trim();

  // 5. If injection detected, wrap with boundary markers
  const injectionAttemptDetected = detectedPatterns.length > 0;

  if (injectionAttemptDetected) {
    // Log the attempt for monitoring
    logger.warn(
      { patterns: detectedPatterns, inputPreview: input.slice(0, 100) },
      'prompt_injection_attempt_detected'
    );

    // Add boundary markers to contain the input
    sanitized = `[USER_INPUT_START]${sanitized}[USER_INPUT_END]`;
  }

  return {
    sanitized,
    originalLength,
    wasTruncated: originalLength > maxLength,
    injectionAttemptDetected,
    detectedPatterns,
  };
}

/**
 * Quick check if input contains potential injection patterns.
 * Faster than full sanitization for pre-validation.
 */
export function containsInjectionPattern(input: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Sanitize for display in error messages (no sensitive data).
 * More aggressive sanitization for user-facing output.
 */
export function sanitizeForErrorMessage(message: string): string {
  // Remove potential paths, stack traces, internal info
  return message
    .replace(/\/[\w/.-]+/g, '[path]')           // File paths
    .replace(/at\s+\S+\s+\(\S+\)/g, '')          // Stack trace lines
    .replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, '[ip]')  // IP addresses
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[email]')  // Emails
    .replace(/[a-f0-9]{32,}/gi, '[hash]')       // Hashes/tokens
    .slice(0, 200)                               // Limit length
    .trim();
}

// ============================================================
// Safe Prompt Building
// ============================================================

/**
 * Build a user prompt section with proper escaping and boundaries.
 * Use this instead of string interpolation for user content.
 */
export function buildUserPromptSection(
  label: string,
  content: string,
  maxLength?: number
): string {
  const result = sanitizeForPrompt(content, maxLength);
  return `## ${label}\n${result.sanitized}`;
}

/**
 * Validate and prepare a question for AI prompt inclusion.
 * Returns null if the input is too dangerous to process.
 */
export function prepareQuestion(
  question: string | undefined
): { question: string; wasModified: boolean } | null {
  if (!question) {
    return { question: '', wasModified: false };
  }

  const result = sanitizeForPrompt(question);

  // If severe injection attempt, refuse to process
  if (result.detectedPatterns.length > 2) {
    logger.error(
      { patterns: result.detectedPatterns },
      'severe_prompt_injection_blocked'
    );
    return null;
  }

  return {
    question: result.sanitized,
    wasModified: result.injectionAttemptDetected || result.wasTruncated,
  };
}
