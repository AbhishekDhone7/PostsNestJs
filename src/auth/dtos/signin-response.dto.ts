import { ApiProperty } from '@nestjs/swagger';

/**
 * Successful result of a sign-in request.
 */
export class SignInResponseDto {
  /** Signed JWT bearer token returned after successful authentication. */
  @ApiProperty({
    description: 'JWT access token returned after successful authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.examplePayload.signature',
    type: String,
    required: true,
    nullable: false,
  })
  accessToken: string;
}
