import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './core/database/prisma.module';
import { SecurityModule } from './core/security/security.module';
import { JwtAuthGuard } from './core/security/guards/jwt-auth.guard';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SecurityModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
