import { BadRequestException, Body, Controller, ForbiddenException, Headers, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { InternalApiKeyGuard } from 'src/internal/internal-api-key.guard';

@Controller('user-routing')
export class UserRoutingController {
  constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

  @UseGuards(InternalApiKeyGuard)
  @Post('create')
  async createProfile(@Headers('x-internal-api-key') apiKey: string, @Body() payload: any) {
    // 1) Validate API key
    if (!apiKey || apiKey !== process.env.GATEWAY_INTERNAL_API_KEY) {
      throw new ForbiddenException('Invalid internal API key');
    }

    // Basic validation
    if (!payload?.keycloakSub) throw new BadRequestException('missing keycloakSub');

    // 2) Forward to Users microservice
    // Here we use message pattern 'create_profile' and pass the payload.
    const created = await lastValueFrom(this.usersClient.send({ cmd: 'create_profile' }, payload));
    return created;
  }
}
