import { ApiProperty } from '@nestjs/swagger';

/** Result contract returned by a hard-delete endpoint. */
export class DeleteOperationResponseDto {
  /** Whether the repository delete call completed. */
  @ApiProperty({
    description: 'Whether the delete operation completed.',
    example: true,
    type: Boolean,
    required: true,
    nullable: false,
  })
  deleted: boolean;

  /** Identifier requested for deletion. */
  @ApiProperty({
    description: 'Identifier supplied for the deleted resource.',
    example: 1,
    type: Number,
    required: true,
    nullable: false,
    minimum: 1,
  })
  id: number;
}

/** Result contract returned by a soft-delete endpoint. */
export class SoftDeleteOperationResponseDto {
  /** Whether the repository soft-delete call completed. */
  @ApiProperty({
    description: 'Whether the soft-delete operation completed.',
    example: true,
    type: Boolean,
    required: true,
    nullable: false,
  })
  softDeleted: boolean;

  /** Identifier requested for soft deletion. */
  @ApiProperty({
    description: 'Identifier supplied for the soft-deleted resource.',
    example: 1,
    type: Number,
    required: true,
    nullable: false,
    minimum: 1,
  })
  id: number;
}
