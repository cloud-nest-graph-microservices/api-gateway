import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class InternalApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const apiKey = req.headers['x-internal-api-key'] as string | undefined;
    if (!apiKey || apiKey !== process.env.GATEWAY_INTERNAL_API_KEY) {
      throw new ForbiddenException('Invalid internal API key');
    }
    return true;
  }
}
