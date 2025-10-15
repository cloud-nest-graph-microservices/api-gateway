import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('key-cloak-jwt') {
    handleRequest(err, user, info, context) {
  console.log('🛡️ Guard triggered');
  if (err || !user) {
    console.log('❌ Guard rejected. Info:', info);
    throw err || new UnauthorizedException();
  }
  console.log('✅ Guard passed. User:', user);
  return user;
}
} // key-cloak-jwt is the strategy