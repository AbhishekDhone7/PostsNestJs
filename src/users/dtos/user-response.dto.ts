import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Public Swagger response projection for a user resource. */
export class UserResponseDto {
  /** Generated user identifier. */
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the user.',
    type: Number,
    required: true,
    nullable: false,
    minimum: 1,
  })
  id: number;

  /** Account given name. */
  @ApiProperty({
    example: 'John',
    description: 'First name of the user.',
    type: String,
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 96,
  })
  firstName: string;

  /** Optional account family name. */
  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Last name of the user.',
    type: String,
    nullable: true,
    minLength: 3,
    maxLength: 96,
  })
  lastName?: string;

  /** Account email address. */
  @ApiProperty({
    example: 'user@example.com',
    description: "User's email address.",
    type: String,
    required: true,
    nullable: false,
    maxLength: 96,
  })
  email: string;
}
