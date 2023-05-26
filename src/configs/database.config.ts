import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';

export default registerAs<DatabaseConfig>('database', () => ({
  url: process.env.DATABASE_URL,
  type: process.env.DATABASE_TYPE,
  name: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
}));
