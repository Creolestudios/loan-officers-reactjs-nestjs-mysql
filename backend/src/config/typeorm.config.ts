import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  port: 3306,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // We can change to false on production
};
