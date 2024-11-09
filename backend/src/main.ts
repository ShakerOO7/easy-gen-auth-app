import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    allowedHeaders: [
      'authorization',
      'content-type',
      'sentry-trace',
      'baggage',
    ],
    credentials: true,
  });
  await app.listen(5000);
}
bootstrap();
