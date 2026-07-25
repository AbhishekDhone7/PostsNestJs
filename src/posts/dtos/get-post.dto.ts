import { IsDate, IsOptional } from 'class-validator';

import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { Type } from 'class-transformer';

/** Base optional date-range criteria accepted by the post-list route. */
class GetPostsBaseDto {
  /** Optional inclusive publication-date lower bound. */
  @ApiPropertyOptional({
    description: 'Inclusive start of the optional publication-date filter.',
    example: '2024-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
    nullable: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  /** Optional inclusive publication-date upper bound. */
  @ApiPropertyOptional({
    description: 'Inclusive end of the optional publication-date filter.',
    example: '2024-12-31T23:59:59.999Z',
    type: String,
    format: 'date-time',
    nullable: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}

/** Composite post-list query contract combining date criteria with pagination. */
export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
