import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/** Retrieves one account by its unique email address for authentication workflows. */
@Injectable()
export class FindOneUserByEmailProvider {
  /** Creates the email lookup provider with its user repository dependency. */
  constructor(
    /**
     * Inject usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Finds an account by its unique email address.
   *
   * @param email Email used as the account lookup key.
   * @returns The matching user.
   * @throws {UnauthorizedException} When no account exists for the email.
   * @throws {RequestTimeoutException} When the database query fails.
   */
  public async findOneByEmail(email: string) {
    let user: User | undefined = undefined;

    try {
      // This will return null if the user is not found
      user = await this.usersRepository.findOneBy({
        email: email,
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not fetch the user',
      });
    }

    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    return user;
  }
}
