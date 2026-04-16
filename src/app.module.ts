import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './core/database/prisma.module';
import { SecurityModule } from './core/security/security.module';
import { ApiResponseInterceptor } from './core/interceptors/api-response.interceptor';
import { GlobalExceptionFilter } from './core/filters/global-exception.filter';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';
import { SessionsModule } from './features/sessions/sessions.module';
import { HistoryModule } from './features/history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SecurityModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    HistoryModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
