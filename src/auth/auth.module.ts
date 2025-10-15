import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'key-cloak-jwt' })],
    providers: [JwtStrategy, JwtAuthGuard],
    exports: [PassportModule, JwtAuthGuard]
})
export class AuthModule {}
