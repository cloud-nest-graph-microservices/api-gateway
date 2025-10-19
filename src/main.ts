import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
  console.log("run the api app on port", process.env.PORT);

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.APP_HOST || '127.0.0.1',
      port: parseInt(process.env.MS_PORT || '4000', 10),
    },
  });

  await microservice.listen();
  console.log("run the api gateway MS on port", process.env.MS_PORT);
}
bootstrap();
