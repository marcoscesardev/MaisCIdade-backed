import { DataSourceOptions } from 'typeorm';
const DB_HOST = 'localhost';
const DB_PORT = '5432';
const DB_USER = 'octoAplicationUser';
const DB_PASSWORD = 'password';
const DB_DATABASE = 'octo';

export const config: DataSourceOptions = {
  type: 'postgres',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  migrations: ['migrations/*.ts'],
  migrationsRun: true,
};
