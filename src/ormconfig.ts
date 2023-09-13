import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'postgres',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['migrations/*.ts'],
  migrationsRun: true,
};
