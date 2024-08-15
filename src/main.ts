import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UsersRepositoryService } from './repositories/users/users-repository.service';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('VReal Soft test task API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
}

function setupValidationPipe(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  setupSwagger(app);
  setupValidationPipe(app);

  const usersRepositoryService = app.get(UsersRepositoryService);

  await usersRepositoryService.seedAdmin();

  await app.listen(configService.get<number>('port'));
}
bootstrap();
