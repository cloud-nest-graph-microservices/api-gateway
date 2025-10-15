// // src/auth/keycloak.client.ts
// import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
// import * as openid from 'openid-client';
// import { createRemoteJWKSet, jwtVerify } from 'jose';
// import { URL } from 'url';

// import { Issuer } from 'openid-client';

// @Injectable()
// export class KeycloakClient implements OnModuleInit {
//   private logger = new Logger('KeycloakClient');
//   private jwks: ReturnType<typeof createRemoteJWKSet> | null = null;
//   public issuerUrl = process.env.KEYCLOAK_ISSUER!;

//   async onModuleInit() {
//     this.logger.log(`Discovering OIDC at ${this.issuerUrl}`);
//     const issuer = await Issuer.discover(this.issuerUrl);
//     const jwksUri = issuer.metadata.jwks_uri;
//     if (!jwksUri) throw new Error('jwks_uri not found in discovery');
//     this.jwks = createRemoteJWKSet(new URL(jwksUri));
//     this.logger.log('JWKS ready: ' + jwksUri);
//   }

//   async verifyToken(token: string) {
//     if (!this.jwks) throw new Error('JWKS not ready');
//     const expectedAudience = process.env.KEYCLOAK_AUDIENCE || undefined;
//     const { payload } = await jwtVerify(token, this.jwks, {
//       issuer: this.issuerUrl,
//       audience: expectedAudience,
//     });
//     return payload as Record<string, any>;
//   }
// }
