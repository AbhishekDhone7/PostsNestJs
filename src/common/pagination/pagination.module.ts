import { Module } from '@nestjs/common';
import { PaginationProvider } from './providers/pagination.provider';

/**
 * Shared pagination module that exports the request-aware pagination provider.
 */
@Module({
  providers: [PaginationProvider],
  exports: [PaginationProvider],
})
export class PaginationModule {}
