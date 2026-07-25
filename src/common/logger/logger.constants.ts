/** Fields and headers whose values must never be written to development logs. */
export const SENSITIVE_FIELD_PATTERN =
  /password|confirmPassword|token|authorization|cookie|secret|jwt|api[-_]?key/i;

/** ANSI escape sequences used only to improve local terminal readability. */
export const CONSOLE_COLORS = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
} as const;

/** Replacement value used when a request or response contains sensitive data. */
export const MASKED_VALUE = '********';
