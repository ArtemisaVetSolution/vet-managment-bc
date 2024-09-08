import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupGlobalConfig } from './common/config/global-config';
import { LoggerService } from './common/services';
import { SwaggerConfig } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService)

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  SwaggerConfig(app);

  app.setGlobalPrefix('api');

  setupGlobalConfig(app, logger);

  await app.listen(port);

  Logger.log(`Server running on port ${port}`, 'Bootstrap');
}

bootstrap();
