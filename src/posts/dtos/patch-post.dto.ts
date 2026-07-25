import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

import { CreatePostDto } from './create-post.dto';

/** Partial post-update contract; the post identifier remains mandatory. */
export class PatchPostDto extends PartialType(CreatePostDto) {
  /** Identifier of the post to update. */
  @ApiProperty({
    description: 'The ID of the post that needs to be updated',
    example: 1,
    type: Number,
    required: true,
    nullable: false,
    minimum: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
