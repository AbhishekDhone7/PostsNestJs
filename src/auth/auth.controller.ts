import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { SignInResponseDto } from './dtos/signin-response.dto';
import { ApiErrorResponseDto } from '../common/dtos/api-error-response.dto';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enums/auth-type-enum';

/**
 * Public credential-exchange controller for the `POST /auth` route.
 *
 * The endpoint validates an email/password pair and returns a signed bearer
 * access token. It issues tokens only; no guard currently protects routes.
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  /** Creates the controller with the authentication-use-case facade. */
  constructor(
    /*
     * Injecting Auth Service
     */
    private readonly authService: AuthService,
  ) {}

  /**
   * Authenticates validated credentials and returns a signed access token.
   *
   * @param signInDto Validated email and plaintext password.
   * @returns A JWT access-token response.
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Sign in',
    description:
      'Public endpoint. Validates user credentials and returns a JWT bearer access token. Refresh tokens are not implemented.',
  })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    description: 'Successful login returns a JWT bearer access token.',
    type: SignInResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The sign-in payload failed validation.',
    type: ApiErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'No user matches the email address or the password is invalid.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not validate the credentials.',
    type: ApiErrorResponseDto,
  })
  @Auth(AuthType.None)
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
