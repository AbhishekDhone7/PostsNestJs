import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

/** Validated request contract for creating a unique tag. */
export class CreateTagDto {
  /** Required human-readable tag name. */
  @ApiProperty({
    description: 'Human-readable tag name.',
    example: 'NestJS',
    type: String,
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 256,
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  /** Required lowercase, hyphen-separated unique slug. */
  @ApiProperty({
    description: 'URL-safe unique tag slug.',
    example: 'nestjs',
    type: String,
    required: true,
    nullable: false,
    maxLength: 512,
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(512)
  slug: string;

  /** Optional human-readable tag description. */
  @ApiPropertyOptional({
    description: 'Optional tag description.',
    example: 'Articles about NestJS.',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description: string;

  /** Optional JSON-LD schema serialized as JSON text. */
  @ApiPropertyOptional({
    description: 'Optional JSON-LD schema encoded as a JSON string.',
    example: '{"@type":"DefinedTerm"}',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsJSON()
  schema: string;

  /** Optional URL for a tag image. */
  @ApiPropertyOptional({
    description: 'Optional featured image URL for the tag.',
    example: 'https://cdn.example.com/tags/nestjs.png',
    type: String,
    format: 'uri',
    nullable: true,
    maxLength: 1024,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImage: string;
}
