import { env_configuration } from '@common/config/env';
import { HttpExceptionFilter } from '@common/decorators/http-exception.filter';
import { LoggerModule } from '@common/loggers/custom-logger.module';
import { CustomLoggerProvider } from '@common/loggers/custom-logger.provider';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infra/database/database.module';
import { CustomersModule } from './modules/customers/customers.module';
import { RepositoryModule } from './infra/database/repositories/repositories.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, load: [env_configuration] }),
    CustomersModule,
    DatabaseModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [CustomLoggerProvider, AppService],
  exports: [CustomLoggerProvider],
})
export class AppModule {}
