import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserRoutingModule } from './user-routing/user-routing.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserRoutingModule],
  controllers: [AppController],
})
export class AppModule {}
