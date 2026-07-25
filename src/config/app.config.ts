import { registerAs } from '@nestjs/config';

/** Application configuration namespace exposing the effective runtime environment. */
export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
}));
