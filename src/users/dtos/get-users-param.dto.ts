import { IsInt, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/** Optional route parameter contract for the users retrieval endpoint. */
export class GetUsersParamDto {
  /** Optional numeric user identifier from the route. */
  @ApiPropertyOptional({
    description: 'Get user with a specific id',
    example: 1234,
    type: Number,
    minimum: 1,
    nullable: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
