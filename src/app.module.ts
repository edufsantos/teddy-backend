import { env_configuration } from '@common/config/env';
import { LoggerModule } from '@common/loggers/custom-logger.module';
import { CustomLoggerProvider } from '@common/loggers/custom-logger.provider';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './infra/database/database.module';
import { RepositoryModule } from './infra/database/repositories/repositories.module';
import { CustomersModule } from './modules/customers/customers.module';
import { HttpExceptionFilter } from '@common/decorators/http-exception.filter';
import { CommonModule } from '@common/common.module';
import { QueueModule } from './infra/queue/queue.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, load: [env_configuration] }),
    CustomersModule,
    DatabaseModule,
    RepositoryModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [
    CommonModule,
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [CommonModule],
})
export class AppModule {}
