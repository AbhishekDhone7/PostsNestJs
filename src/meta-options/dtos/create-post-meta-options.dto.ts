import { IsJSON, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** Validated nested or standalone request contract for JSON post metadata. */
export class CreatePostMetaOptionsDto {
  /** Required metadata encoded as a valid JSON string. */
  @ApiProperty({
    description: 'Arbitrary metadata encoded as a valid JSON string.',
    example: '{"sidebarEnabled":true,"readingTime":5}',
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
