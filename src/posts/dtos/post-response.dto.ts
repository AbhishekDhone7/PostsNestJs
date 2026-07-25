import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MetaOptionResponseDto } from '../../meta-options/dtos/meta-option-response.dto';
import { TagResponseDto } from '../../tags/dtos/tag-response.dto';
import { UserResponseDto } from '../../users/dtos/user-response.dto';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';

/** Public Swagger response projection for a post and its persisted associations. */
export class PostResponseDto {
  /** Generated post identifier. */
  @ApiProperty({
    description: 'Unique identifier for the post.',
    example: 1,
    type: Number,
    required: true,
    nullable: false,
    minimum: 1,
  })
  id: number;

  /** Persisted post title. */
  @ApiProperty({
    description: 'Post title.',
    example: 'Getting started with NestJS',
    type: String,
    required: true,
    nullable: false,
    minLength: 4,
    maxLength: 512,
  })
  title: string;

  /** Persisted post content type. */
  @ApiProperty({
    description: 'Content type of the post.',
    enum: postType,
    enumName: 'PostType',
    example: postType.POST,
    required: true,
    nullable: false,
  })
  postType: postType;

  /** Unique URL-safe post slug. */
  @ApiProperty({
    description: 'URL-safe unique slug.',
    example: 'getting-started-with-nestjs',
    type: String,
    required: true,
    nullable: false,
    maxLength: 256,
  })
  slug: string;

  /** Persisted publication status. */
  @ApiProperty({
    description: 'Publication state of the post.',
    enum: postStatus,
    enumName: 'PostStatus',
    example: postStatus.PUBLISHED,
    required: true,
    nullable: false,
  })
  status: postStatus;

  /** Optional post body. */
  @ApiPropertyOptional({
    description: 'Optional post body.',
    example: 'A practical introduction to building APIs with NestJS.',
    type: String,
    nullable: true,
  })
  content?: string;

  /** Optional JSON-LD schema string. */
  @ApiPropertyOptional({
    description: 'Optional JSON-LD schema encoded as a JSON string.',
    example: '{"@context":"https://schema.org","@type":"Article"}',
    type: String,
    nullable: true,
  })
  schema?: string;

  /** Optional featured-image URL. */
  @ApiPropertyOptional({
    description: 'Optional featured image URL.',
    example: 'https://cdn.example.com/posts/nestjs.png',
    type: String,
    format: 'uri',
    nullable: true,
    maxLength: 1024,
  })
  featuredImageUrl?: string;

  /** Optional scheduled publication timestamp. */
  @ApiPropertyOptional({
    description: 'Optional scheduled publication timestamp.',
    example: '2024-03-16T07:46:32.000Z',
    type: String,
    format: 'date-time',
    nullable: true,
  })
  publishOn?: Date;

  /** Optional eager-loaded metadata record. */
  @ApiPropertyOptional({
    description: 'Optional metadata associated with this post.',
    type: () => MetaOptionResponseDto,
    nullable: true,
  })
  metaOptions?: MetaOptionResponseDto;

  /** Eager-loaded post author. */
  @ApiProperty({
    description: 'Author loaded with the post.',
    type: () => UserResponseDto,
    required: true,
    nullable: false,
  })
  author: UserResponseDto;

  /** Eager-loaded post tags. */
  @ApiProperty({
    description: 'Tags loaded with the post.',
    type: () => TagResponseDto,
    isArray: true,
    required: true,
    nullable: false,
  })
  tags: TagResponseDto[];
}
