import { ApiProperty } from '@nestjs/swagger';

/** Public Swagger response projection for a metadata option. */
export class MetaOptionResponseDto {
  /** Generated metadata record identifier. */
  @ApiProperty({
    description: 'Unique identifier for the metadata record.',
    example: 1,
    type: Number,
    required: true,
    nullable: false,
    minimum: 1,
  })
  id: number;

  /** JSON metadata value persisted by the entity. */
  @ApiProperty({
    description: 'Metadata persisted as a valid JSON string.',
    example: '{"sidebarEnabled":true,"readingTime":5}',
    type: String,
    required: true,
    nullable: false,
  })
  metaValue: string;

  /** Creation timestamp maintained by TypeORM. */
  @ApiProperty({
    description: 'Timestamp at which the metadata record was created.',
    example: '2024-03-16T07:46:32.000Z',
    type: String,
    format: 'date-time',
    required: true,
    nullable: false,
  })
  createDate: Date;

  /** Latest update timestamp maintained by TypeORM. */
  @ApiProperty({
    description: 'Timestamp at which the metadata record was last updated.',
    example: '2024-03-16T07:46:32.000Z',
    type: String,
    format: 'date-time',
    required: true,
    nullable: false,
  })
  updateDate: Date;
}
