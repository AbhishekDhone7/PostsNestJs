import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Public Swagger response projection for a tag resource. */
export class TagResponseDto {
  /** Generated tag identifier. */
  @ApiProperty({
    description: 'Unique identifier for the tag.',
    example: 1,
    type: Number,
    required: true,
    nullable: false,
    minimum: 1,
  })
  id: number;

  /** Unique human-readable tag name. */
  @ApiProperty({
    description: 'Human-readable tag name.',
    example: 'NestJS',
    type: String,
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 256,
  })
  name: string;

  /** Unique URL-safe tag slug. */
  @ApiProperty({
    description: 'URL-safe unique tag slug.',
    example: 'nestjs',
    type: String,
    required: true,
    nullable: false,
    maxLength: 512,
  })
  slug: string;

  /** Optional tag description. */
  @ApiPropertyOptional({
    description: 'Optional tag description.',
    example: 'Articles about NestJS.',
    type: String,
    nullable: true,
  })
  description?: string;

  /** Optional JSON-LD schema string. */
  @ApiPropertyOptional({
    description: 'Optional JSON-LD schema encoded as a JSON string.',
    example: '{"@type":"DefinedTerm"}',
    type: String,
    nullable: true,
  })
  schema?: string;

  /** Optional URL for a featured tag image. */
  @ApiPropertyOptional({
    description: 'Optional featured image URL for the tag.',
    example: 'https://cdn.example.com/tags/nestjs.png',
    type: String,
    format: 'uri',
    nullable: true,
    maxLength: 1024,
  })
  featuredImage?: string;

  /** Timestamp assigned when the tag is first persisted. */
  @ApiProperty({
    description: 'Timestamp at which the tag was created.',
    example: '2024-03-16T07:46:32.000Z',
    type: String,
    format: 'date-time',
    required: true,
    nullable: false,
  })
  createDate: Date;

  /** Timestamp of the latest tag update. */
  @ApiProperty({
    description: 'Timestamp at which the tag was most recently updated.',
    example: '2024-03-16T07:46:32.000Z',
    type: String,
    format: 'date-time',
    required: true,
    nullable: false,
  })
  updateDate: Date;

  /** Timestamp assigned by TypeORM soft deletion, if any. */
  @ApiPropertyOptional({
    description: 'Timestamp at which the tag was soft-deleted.',
    example: null,
    type: String,
    format: 'date-time',
    nullable: true,
  })
  deletedAt?: Date | null;
}
