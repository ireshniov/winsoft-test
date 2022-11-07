import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/AppModule';
import { appBootstrap } from './app';
import { LoggerService } from './module/common/logger/service/LoggerService';

async function bootstrap(logger: LoggerService): Promise<INestApplication> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger,
  });

  await appBootstrap(app);

  const port: string = `${process.env.SERVER_PORT}` || '3000';

  await app.listen(port);

  return app;
}

(async (): Promise<void> => {
  const logger: LoggerService = new LoggerService(AppModule.name);

  await bootstrap(logger);
})();
