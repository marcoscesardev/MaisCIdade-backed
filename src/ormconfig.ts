import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'postgres',
  synchronize: true,
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // host: DB_HOST,
  // port: parseInt(DB_PORT),
  // username: DB_USER,
  // password: DB_PASSWORD,
  // database: DB_DATABASE,
  migrations: ['migrations/*.ts'],
  migrationsRun: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
