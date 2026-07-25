import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Standard error payload shape exposed in Swagger endpoint declarations. */
export class ApiErrorResponseDto {
  /** HTTP response status code. */
  @ApiProperty({
    description: 'HTTP status code for the failed request.',
    example: 400,
    type: Number,
    required: true,
    nullable: false,
  })
  statusCode: number;

  /** NestJS error category. */
  @ApiProperty({
    description: 'Machine-readable or human-readable error category.',
    example: 'Bad Request',
    type: String,
    required: true,
    nullable: false,
  })
  error: string;

  /** Single error message or validation-message collection. */
  @ApiProperty({
    description: 'Explanation of the request failure.',
    example: ['firstName must be longer than or equal to 3 characters'],
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    required: true,
    nullable: false,
  })
  message: string | string[];

  /** Request path when supplied by NestJS error handling. */
  @ApiPropertyOptional({
    description:
      'Request path, when supplied by NestJS default error handling.',
    example: '/users',
    type: String,
    nullable: false,
  })
  path?: string;
}
