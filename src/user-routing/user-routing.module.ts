import { Module } from '@nestjs/common';
import { UserRoutingController } from './user-routing.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InternalApiKeyGuard } from 'src/internal/internal-api-key.guard';

@Module({
    controllers: [UserRoutingController],
    imports: [
        ClientsModule.register([
            {
                name: 'USERS_CLIENT',
                transport: Transport.TCP,
                options: {
                host: process.env.USERS_SERVICE_HOST ,
                port: parseInt(process.env.USER_SERVICE_PORT || '3002', 10),
                },
            },
        ]),
    ],
    providers: [InternalApiKeyGuard],
})
export class UserRoutingModule {}
