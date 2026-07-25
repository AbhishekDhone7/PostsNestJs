import { Injectable } from '@nestjs/common';

/**
 * Application-level service for the default Nest starter response.
 */
@Injectable()
export class AppService {
  /**
   * Returns the legacy starter greeting.
   *
   * @returns The static greeting string.
   */
  getHello(): string {
    return 'Hello From NestJS!';
  }
}
