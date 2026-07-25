import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

/** Validated batch request contract consumed by the transactional user-creation provider. */
export class CreateManyUsersDto {
  /** Required collection of users to create in one transaction. */
  @ApiProperty({
    description: 'Users to create in one database transaction.',
    type: () => CreateUserDto,
    isArray: true,
    required: true,
    nullable: false,
    minItems: 1,
    example: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'P@ssw0rd!',
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
