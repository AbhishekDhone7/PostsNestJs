import { registerAs } from '@nestjs/config';

/**
 * Database configuration namespace used by the asynchronous TypeORM bootstrap.
 *
 * Database connection values are environment-backed. Host and port default to
 * `localhost` and `5432`; schema synchronization and entity auto-loading are
 * disabled unless their corresponding environment values equal `true`.
 */
export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
}));
