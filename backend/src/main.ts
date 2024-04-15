import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { AllExceptionsFilter } from './shared/interceptor/error.interceptor';
import { FirebaseClass } from './config/firebase.config';
import * as morgan from 'morgan';
const helmet = require('helmet');

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Initialize the firebase admin app
  new FirebaseClass();

  /* Extra Security Layer */
  app.use(helmet());

  let corsOption = undefined;
  if (process.env.NODE_ENV !== 'production') {
    corsOption = {
      origin: ['http://localhost:3001', 'http://loantack-dev.s3-website-us-west-1.amazonaws.com'],
    };
  }

  app.enableCors(corsOption);

  app.use(json({ limit: '100mb' }));

  /* Serve Static Files */
  app.useStaticAssets(join(__dirname, '..', 'public'));

  /* Catch All Exception */
  app.useGlobalFilters(new AllExceptionsFilter());

  /*Console Every Request Information*/
  app.use(morgan('tiny'));

  /* Sentry Entry point */
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
    ignoreErrors: ["Bad Request Exception"],
  });

  await app.listen(process.env.PORT);
}
bootstrap();
