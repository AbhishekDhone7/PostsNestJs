import { ApiProperty } from '@nestjs/swagger';

/** Hypermedia navigation links generated for a paginated response. */
export class PaginationLinksResponseDto {
  /** URL for page one. */
  @ApiProperty({
    description: 'URL for the first page of results.',
    example: 'http://localhost:3000/posts?limit=10&page=1',
    type: String,
    format: 'uri',
    required: true,
    nullable: false,
  })
  first: string;

  /** URL for the preceding page, clamped to page one. */
  @ApiProperty({
    description: 'URL for the previous page of results.',
    example: 'http://localhost:3000/posts?limit=10&page=1',
    type: String,
    format: 'uri',
    required: true,
    nullable: false,
  })
  previous: string;

  /** URL for the returned page. */
  @ApiProperty({
    description: 'URL for the current page of results.',
    example: 'http://localhost:3000/posts?limit=10&page=2',
    type: String,
    format: 'uri',
    required: true,
    nullable: false,
  })
  current: string;

  /** URL for the next page, clamped to the final page. */
  @ApiProperty({
    description: 'URL for the next page of results.',
    example: 'http://localhost:3000/posts?limit=10&page=3',
    type: String,
    format: 'uri',
    required: true,
    nullable: false,
  })
  next: string;

  /** URL for the final page. */
  @ApiProperty({
    description: 'URL for the last page of results.',
    example: 'http://localhost:3000/posts?limit=10&page=5',
    type: String,
    format: 'uri',
    required: true,
    nullable: false,
  })
  last: string;
}
