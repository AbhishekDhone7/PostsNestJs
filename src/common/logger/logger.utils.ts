import { MASKED_VALUE, SENSITIVE_FIELD_PATTERN } from './logger.constants';
import { Request } from 'express';

/**
 * Returns a deep, non-mutating copy of a log value with sensitive values masked.
 *
 * @param value Value to prepare for console output.
 * @returns A log-safe representation of the supplied value.
 */
export function maskSensitiveData(value: unknown): unknown {
  return maskValue(value, new WeakSet<object>());
}

/**
 * Formats a value for readable console output without allowing serialization errors.
 *
 * @param value Log-safe value to serialize.
 * @returns A printable JSON representation.
 */
export function formatLogValue(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2) ?? String(value);
  } catch {
    return '[Unserializable value]';
  }
}

/**
 * Calculates the serialized byte length of a request or response body.
 *
 * @param value Value whose size should be measured.
 * @returns UTF-8 payload size in bytes.
 */
export function getPayloadSize(value: unknown): number {
  if (value === undefined || value === null) {
    return 0;
  }

  if (Buffer.isBuffer(value)) {
    return value.length;
  }

  return Buffer.byteLength(formatLogValue(value), 'utf8');
}

/**
 * Generates a shell-safe cURL equivalent of an incoming Express request.
 * Sensitive header and body values are masked before the command is returned.
 *
 * @param request Incoming Express request.
 * @returns A multi-line cURL command suitable for local debugging.
 */
export function createCurlCommand(request: Request): string {
  const protocol = request.protocol || 'http';
  const host = request.get('host') || 'localhost';
  const targetUrl = `${protocol}://${host}${request.originalUrl || request.url}`;
  const headers = maskSensitiveData(request.headers) as Record<string, unknown>;
  const headerArguments = Object.entries(headers)
    .filter(
      ([name]) => !['host', 'content-length', 'connection'].includes(name),
    )
    .map(([name, value]) => `--header ${quoteForShell(`${name}: ${value}`)}`);
  const hasBody = request.body !== undefined && request.body !== null;
  const bodyArgument = hasBody
    ? `--data ${quoteForShell(formatLogValue(maskSensitiveData(request.body)))}`
    : undefined;

  return [
    `curl --location ${quoteForShell(targetUrl)}`,
    ...headerArguments,
    bodyArgument,
  ]
    .filter((part): part is string => Boolean(part))
    .join(' \\\n+  ');
}

function maskValue(value: unknown, seen: WeakSet<object>): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => maskValue(item, seen));
  }

  if (value instanceof Date || Buffer.isBuffer(value)) {
    return value;
  }

  if (value && typeof value === 'object') {
    if (seen.has(value)) {
      return '[Circular]';
    }

    seen.add(value);
    const maskedEntries = Object.entries(value as Record<string, unknown>).map(
      ([key, entryValue]) => [
        key,
        SENSITIVE_FIELD_PATTERN.test(key)
          ? MASKED_VALUE
          : maskValue(entryValue, seen),
      ],
    );

    return Object.fromEntries(maskedEntries);
  }

  return value;
}

function quoteForShell(value: string): string {
  return `'${value.replace(/'/g, `'"'"'`)}'`;
}
