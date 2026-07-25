import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Validated request contract for creating one user account. */
export class CreateUserDto {
  /** Required given name, from 3 to 96 characters. */
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    type: String,
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 96,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  /** Optional family name, from 3 to 96 characters when supplied. */
  @ApiPropertyOptional({
    description: 'Last name of the user',
    example: 'Doe',
    type: String,
    nullable: true,
    minLength: 3,
    maxLength: 96,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  /** Required unique email address used for account lookup. */
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    type: String,
    required: true,
    nullable: false,
    maxLength: 96,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;

  /** Required plaintext password; it is hashed before single-user persistence. */
  @ApiProperty({
    description:
      'User password (minimum eight characters, include a number and a special character)',
    example: 'P@ssw0rd!',
    type: String,
    required: true,
    nullable: false,
    minLength: 8,
    maxLength: 96,
    format: 'password',
    writeOnly: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;
}
