import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

/**
 * Executes the credential verification and JWT issuance workflow.
 *
 * It reads the user record, compares the supplied password through the hashing
 * abstraction, and signs `{ sub, email }` with the configured JWT audience,
 * issuer, secret, and TTL.
 */
@Injectable()
export class SignInProvider {
  /** Creates the credential verification workflow with user, hashing, JWT, and configuration dependencies. */
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject the hashingProvider
     */
    private readonly hashingProvider: HashingProvider,

    private readonly grnerateTokenProvider: GenerateTokensProvider,
  ) {}

  /**
   * Verifies sign-in credentials and generates a JWT bearer token.
   *
   * @param signInDto The validated email and plaintext password.
   * @returns An object containing the signed access token.
   * @throws {UnauthorizedException} When the password does not match.
   * @throws {RequestTimeoutException} When password comparison fails.
   */
  public async signIn(signInDto: SignInDto) {
    // find user by email ID
    const user = await this.usersService.findOneByEmail(signInDto.email);
    // Throw exception if user is not found
    // Above | Taken care by the findInByEmail method

    let isEqual: boolean = false;

    try {
      // Compare the password to hash
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare the password',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    return await this.grnerateTokenProvider.generateTokens(user);
  }
}
