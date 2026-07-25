import { Injectable } from '@nestjs/common';

/**
 * Abstraction for one-way password hashing and verification.
 *
 * Auth consumers depend on this token while {@link BcryptProvider} supplies
 * the concrete bcrypt implementation in {@link AuthModule}.
 */
@Injectable()
export abstract class HashingProvider {
  /**
   * Produces a non-reversible password hash.
   *
   * @param data Plaintext data to hash.
   * @returns The encoded hash.
   */
  abstract hashPassword(data: string | Buffer): Promise<string>;

  /**
   * Compares plaintext data with an encoded hash.
   *
   * @param data Plaintext data supplied by the caller.
   * @param encrypted Persisted encoded hash.
   * @returns Whether the values match.
   */
  abstract comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
