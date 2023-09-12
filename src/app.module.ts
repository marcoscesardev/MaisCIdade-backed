import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { config } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ComplaintModule } from './complaint/complaint.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(config),
    AuthModule,
    CategoriesModule,
    ComplaintModule,
    RatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        {
          path: 'user',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
