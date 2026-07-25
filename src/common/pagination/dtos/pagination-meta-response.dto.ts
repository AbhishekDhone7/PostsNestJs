import { ApiProperty } from '@nestjs/swagger';

/** Metadata portion of a paginated API response. */
export class PaginationMetaResponseDto {
  /** Number of records requested per page. */
  @ApiProperty({
    description: 'Number of records returned per page.',
    example: 10,
    type: Number,
    required: true,
    nullable: false,
    minimum: 1,
  })
  itemsPerPage: number;

  /** Total number of matching records. */
  @ApiProperty({
    description: 'Total number of available records.',
    example: 42,
    type: Number,
    required: true,
    nullable: false,
    minimum: 0,
  })
  totalItems: number;

  /** One-based index of the returned page. */
  @ApiProperty({
    description: 'One-based index of the current page.',
    example: 1,
    type: Number,
    required: true,
    nullable: false,
    minimum: 1,
  })
  currentPage: number;

  /** Number of pages represented by the total. */
  @ApiProperty({
    description: 'Total number of result pages.',
    example: 5,
    type: Number,
    required: true,
    nullable: false,
    minimum: 0,
  })
  totalPages: number;
}
