import { registerAs } from '@nestjs/config';

/**
 * JWT configuration namespace consumed by the signer.
 *
 * `JWT_SECRET`, `JWT_TOKEN_AUDIENCE`, and `JWT_TOKEN_ISSUER` have no fallback
 * and must be supplied securely by the deployment environment. Access-token
 * lifetime is read from `JWT_ACCESS_TOKEN_TTL` in seconds and defaults to 3600.
 */
export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  };
});
