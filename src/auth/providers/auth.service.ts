import { SignInProvider } from './sign-in.provider';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';

/**
 * Facade for authentication use cases.
 *
 * Delegates credential processing to {@link SignInProvider}; the injected user
 * service is retained to support the users/auth circular dependency.
 */
@Injectable()
export class AuthService {
  /** Creates the authentication facade with user and sign-in dependencies. */
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject the signInProvider
     */
    private readonly signInProvider: SignInProvider,
  ) {}

  /**
   * Validates credentials and produces an access token.
   *
   * @param signInDto Validated sign-in credentials.
   * @returns The signed access-token response.
   */
  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  /**
   * Reports the current placeholder authentication state.
   *
   * This method does not inspect a request or token and always returns `true`.
   *
   * @returns `true`.
   */
  public isAuth() {
    return true;
  }
}
