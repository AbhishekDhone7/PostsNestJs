import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Request contract for the public credential-exchange endpoint.
 *
 * Global validation rejects unknown properties. Both values are required; the
 * email must use a valid format and the password must contain at least 8
 * characters.
 */
export class SignInDto {
  /** Email address used to locate the account. */
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    type: String,
    required: true,
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /** Plaintext password used only for credential verification. */
  @ApiProperty({
    description: 'User password (minimum 8 characters)',
    example: 'P@ssw0rd!',
    type: String,
    required: true,
    nullable: false,
    minLength: 8,
    format: 'password',
    writeOnly: true,
  })
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
