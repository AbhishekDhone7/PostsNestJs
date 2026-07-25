import { APP_INTERCEPTOR } from '@nestjs/core';
import { DevelopmentLoggerService } from './logger.service';
import { LoggerInterceptor } from './logger.interceptor';
import { Module } from '@nestjs/common';

/**
 * Development-console logging module.
 *
 * Importing this module registers {@link LoggerInterceptor} as an application
 * interceptor. Remove it from the root module to disable HTTP logging.
 */
@Module({
  providers: [
    DevelopmentLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class LoggerModule {}
