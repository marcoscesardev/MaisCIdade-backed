import { DataSourceOptions } from 'typeorm';
const DB_HOST = 'ec2-3-210-173-88.compute-1.amazonaws.com';
const DB_PORT = '5432';
const DB_USER = 'dtjnndbjkseoop';
const DB_PASSWORD =
  'a096b3ad8923d946df421dcc1eed571f83f3822bfe153ceb54e9adeea7daff1a';
const DB_DATABASE = 'd9kfd1k72ioa9n';

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
