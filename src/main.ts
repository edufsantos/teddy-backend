import 'dotenv/config';
import { useContainer } from 'class-validator';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { CustomLogger } from '@common/loggers/custom.logger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
      ],
    }),
  });

  const customLogger = app.get(CustomLogger);
  app.useLogger(customLogger);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = []; // Use this array to define allowed origins
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost')) {
        callback(null, true);
      } else {
        customLogger.warn(`CORS blocked: ${origin}`);
        callback(new Error(`Not allowed by CORS, origin: ${origin}`));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Allow-Origin',
    ],
    exposedHeaders: ['Content-Length', 'Content-Range', 'X-Content-Range'],
    maxAge: 86400,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
