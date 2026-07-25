import { IsOptional, IsPositive } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Optional query contract for offset pagination.
 *
 * Values are transformed to numbers and must be positive when supplied. The
 * defaults return the first page with up to ten records.
 */
export class PaginationQueryDto {
  /** Maximum records returned for one page; defaults to 10. */
  @ApiPropertyOptional({
    description: 'Maximum number of records to return per page.',
    example: 10,
    type: Number,
    minimum: 1,
    default: 10,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;

  /** One-based result page requested by the caller; defaults to 1. */
  @ApiPropertyOptional({
    description: 'One-based page number to return.',
    example: 1,
    type: Number,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number = 1;
}
