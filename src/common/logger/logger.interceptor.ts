import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Request, Response } from 'express';
import { DevelopmentLoggerService } from './logger.service';
import { getPayloadSize, maskSensitiveData } from './logger.utils';

/**
 * Global development interceptor that prints HTTP request, response, and error
 * diagnostics without changing request flow or response values.
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  /** Creates the interceptor with the development console logger. */
  constructor(private readonly loggerService: DevelopmentLoggerService) {}

  /**
   * Logs an HTTP exchange around the downstream Nest handler.
   *
   * @param context Nest execution context.
   * @param next Downstream handler.
   * @returns The original response observable.
   */
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();
    const startedAt = process.hrtime.bigint();

    this.loggerService.logRequest(request);

    return next.handle().pipe(
      tap((body: unknown) => {
        const maskedBody = maskSensitiveData(body);
        this.loggerService.logResponse({
          timestamp: new Date().toISOString(),
          method: request.method,
          url: request.originalUrl || request.url,
          statusCode: response.statusCode,
          body: maskedBody,
          responseTime: getElapsedMilliseconds(startedAt),
          responseSize: getPayloadSize(maskedBody),
        });
      }),
      catchError((error: unknown) => {
        this.loggerService.logError({
          timestamp: new Date().toISOString(),
          method: request.method,
          url: request.originalUrl || request.url,
          statusCode: getStatusCode(error),
          responseTime: getElapsedMilliseconds(startedAt),
          exceptionName: getExceptionName(error),
          exceptionMessage: getExceptionMessage(error),
          stackTrace: error instanceof Error ? error.stack : undefined,
        });

        return throwError(() => error);
      }),
    );
  }
}

function getElapsedMilliseconds(startedAt: bigint): number {
  return Number(process.hrtime.bigint() - startedAt) / 1_000_000;
}

function getStatusCode(error: unknown): number {
  if (error instanceof HttpException) {
    return error.getStatus();
  }

  if (typeof error === 'object' && error && 'status' in error) {
    const status = Number(error.status);
    return Number.isFinite(status) ? status : 500;
  }

  return 500;
}

function getExceptionName(error: unknown): string {
  return error instanceof Error ? error.name : 'UnknownException';
}

function getExceptionMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
