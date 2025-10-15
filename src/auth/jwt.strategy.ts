import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'key-cloak-jwt') {
  constructor(private config: ConfigService) {
    
    const keyCloakBaseUrl = config.get<string>('KEYCLOAK_BASE_URL');
    const keyCloakRealmName = config.get<string>('KEYCLOAK_REALM');
    const keyCloakClientId = config.get<string>('KEYCLOAK_CLIENT_ID');

    super({
    secretOrKeyProvider: jwksRsa.passportJwtSecret({
      jwksUri: `${keyCloakBaseUrl}/realms/${keyCloakRealmName}/protocol/openid-connect/certs`,
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
    }),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    algorithms: ['RS256'],
  }); 
  }

  async validate(payload: any) {
    console.log("dddd");
    return payload; // You can enrich this with user roles, etc.
  }
}