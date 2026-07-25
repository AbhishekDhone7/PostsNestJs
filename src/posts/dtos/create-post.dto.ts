import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';

/** Validated request contract for a new post, author reference, tag references, and optional metadata. */
export class CreatePostDto {
  /** Required post title with a 4-to-512 character limit. */
  @ApiProperty({
    example: 'This is a title',
    description: 'This is the title for the blog post',
    type: String,
    required: true,
    nullable: false,
    minLength: 4,
    maxLength: 512,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  /** Required publication content type. */
  @ApiProperty({
    enum: postType,
    description: "Possible values, 'post', 'page', 'story', 'series'",
    enumName: 'PostType',
    example: postType.POST,
    required: true,
    nullable: false,
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  /** Required lowercase, hyphen-separated unique slug. */
  @ApiProperty({
    description: "For Example - 'my-url'",
    example: 'my-blog-post',
    type: String,
    required: true,
    nullable: false,
    maxLength: 256,
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(256)
  slug: string;

  /** Required publication lifecycle status. */
  @ApiProperty({
    enum: postStatus,
    description: "Possible values 'draft', 'scheduled', 'review', 'published'",
    enumName: 'PostStatus',
    example: postStatus.DRAFT,
    required: true,
    nullable: false,
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  /** Optional textual post body. */
  @ApiPropertyOptional({
    description: 'This is the content of the post',
    example: 'The post content',
    type: String,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  content?: string;

  /** Optional JSON-LD schema serialized as JSON text. */
  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
    example:
      '{\r\n "@context": "https://schema.org",\r\n "@type": "Person"\r\n }',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  /** Optional valid URL for a featured image. */
  @ApiPropertyOptional({
    description: 'Featured image for your blog post',
    example: 'http://localhost.com/images/image1.jpg',
    type: String,
    format: 'uri',
    nullable: true,
    maxLength: 1024,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  /** Optional scheduled publication timestamp. */
  @ApiPropertyOptional({
    description: 'The date on which the blog post is published',
    example: '2024-03-16T07:46:32.000Z',
    type: String,
    format: 'date-time',
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  publishOn?: Date;

  /** Optional collection of integer tag identifiers. */
  @ApiPropertyOptional({
    description: 'Array of ids of tags',
    example: [1, 2],
    type: Number,
    isArray: true,
    nullable: true,
    minimum: 1,
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  /** Optional nested metadata record. */
  @ApiPropertyOptional({
    description: 'Optional JSON metadata associated with the post.',
    type: () => CreatePostMetaOptionsDto,
    nullable: true,
    example: { metaValue: '{"sidebarEnabled": true}' },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;

  /** Required identifier of the user who authors the post. */
  @ApiProperty({
    type: 'integer',
    required: true,
    example: 1,
    description: 'Identifier of the existing user who authors the post.',
    minimum: 1,
    nullable: false,
  })
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
