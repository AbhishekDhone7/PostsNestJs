import { ApiProperty } from '@nestjs/swagger';

import { PaginationLinksResponseDto } from '../../common/pagination/dtos/pagination-links-response.dto';
import { PaginationMetaResponseDto } from '../../common/pagination/dtos/pagination-meta-response.dto';
import { PostResponseDto } from './post-response.dto';

/** Swagger schema for a page of post records and the associated navigation metadata. */
export class PaginatedPostResponseDto {
  /** Posts returned for the requested page. */
  @ApiProperty({
    description: 'Posts for the requested page.',
    type: () => PostResponseDto,
    isArray: true,
    required: true,
    nullable: false,
  })
  data: PostResponseDto[];

  /** Pagination counters for the result set. */
  @ApiProperty({
    description: 'Pagination counters for this result set.',
    type: () => PaginationMetaResponseDto,
    required: true,
    nullable: false,
  })
  meta: PaginationMetaResponseDto;

  /** Request-derived navigation links. */
  @ApiProperty({
    description: 'Navigation links for the result set.',
    type: () => PaginationLinksResponseDto,
    required: true,
    nullable: false,
  })
  links: PaginationLinksResponseDto;
}
