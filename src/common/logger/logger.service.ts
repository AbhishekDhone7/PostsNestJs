import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { CONSOLE_COLORS } from './logger.constants';
import { HttpErrorLog, HttpRequestLog, HttpResponseLog } from './logger.types';
import {
  createCurlCommand,
  formatLogValue,
  getPayloadSize,
  maskSensitiveData,
} from './logger.utils';

/**
 * Formats development-only HTTP diagnostics and writes them through Nest's
 * console logger. It contains no persistence, environment, or transport logic.
 */
@Injectable()
export class DevelopmentLoggerService {
  private readonly logger = new Logger(DevelopmentLoggerService.name);

  /**
   * Prints details of an incoming request before controller execution.
   *
   * @param request Incoming Express request.
   */
  public logRequest(request: Request): void {
    const details: HttpRequestLog = {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.originalUrl || request.url,
      params: maskSensitiveData(request.params) as Record<string, unknown>,
      query: maskSensitiveData(request.query) as Record<string, unknown>,
      body: maskSensitiveData(request.body),
      headers: maskSensitiveData(request.headers) as Record<string, unknown>,
      ipAddress: request.ip || request.socket.remoteAddress,
      userAgent: request.get('user-agent'),
      requestSize: getRequestSize(request),
      curl: createCurlCommand(request),
    };

    this.logger.log(this.formatBlock('INFO Incoming Request', details, 'cyan'));
  }

  /**
   * Prints details of a completed response using the level implied by its status.
   *
   * @param details Response diagnostics collected by the interceptor.
   */
  public logResponse(details: HttpResponseLog): void {
    const message = this.formatBlock(
      details.statusCode >= 500
        ? 'ERROR Outgoing Response'
        : details.statusCode >= 400
          ? 'WARN Outgoing Response'
          : 'INFO Outgoing Response',
      details,
      details.statusCode >= 500
        ? 'red'
        : details.statusCode >= 400
          ? 'yellow'
          : 'green',
    );

    if (details.statusCode >= 500) {
      this.logger.error(message);
      return;
    }

    if (details.statusCode >= 400) {
      this.logger.warn(message);
      return;
    }

    this.logger.log(message);
  }

  /**
   * Prints exception diagnostics for an unsuccessful request.
   *
   * @param details Error diagnostics collected by the interceptor.
   */
  public logError(details: HttpErrorLog): void {
    this.logger.error(this.formatBlock('ERROR Request Error', details, 'red'));
  }

  private formatBlock(
    title: string,
    details: object,
    color: keyof typeof CONSOLE_COLORS,
  ): string {
    const divider = '='.repeat(58);
    const entries = Object.entries(details).map(
      ([key, value]) => `${key.padEnd(14)}: ${formatLogValue(value)}`,
    );
    const heading = `${CONSOLE_COLORS[color]}${title}${CONSOLE_COLORS.reset}`;

    return `\n${divider}\n${heading}\n${divider}\n${entries.join(
      '\n',
    )}\n${divider}`;
  }
}

function getRequestSize(request: Request): number {
  const declaredSize = Number(request.get('content-length'));
  return Number.isFinite(declaredSize)
    ? declaredSize
    : getPayloadSize(request.body);
}
