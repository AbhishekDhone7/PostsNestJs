import * as bcrypt from 'bcrypt';

import { HashingProvider } from './hashing.provider';
import { Injectable } from '@nestjs/common';

/**
 * Bcrypt implementation of the application's password-hashing contract.
 */
@Injectable()
export class BcryptProvider implements HashingProvider {
  /**
   * Generates a bcrypt salt and hashes the supplied value.
   *
   * @param data Plaintext password or byte buffer.
   * @returns A bcrypt-encoded password hash.
   */
  public async hashPassword(data: string | Buffer): Promise<string> {
    // Generate the salt
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

  /**
   * Verifies plaintext data against a bcrypt hash.
   *
   * @param data Plaintext password or byte buffer.
   * @param encrypted Bcrypt-encoded hash.
   * @returns Whether the values match.
   */
  public async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
