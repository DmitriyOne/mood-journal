import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { PgExceptionFilter } from './filters';
import { ConfigService } from '@nestjs/config';
import { TEnvConfig } from './schema';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PgExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService<TEnvConfig>);

  const port = configService.get<number>('PORT');
  await app.listen(port!);
  logger.log(`Server is running on port: ${port}`);

  const url = await app.getUrl();
  logger.log(`The application is running on: ${url}`);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap: ', err);
  process.exit(1);
});
