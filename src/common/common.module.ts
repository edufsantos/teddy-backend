import { Module } from '@nestjs/common';
import { CustomLoggerProvider } from './loggers/custom-logger.provider';
import { CqrsModule } from '@nestjs/cqrs';
import { EntityEventsDispatcher } from './events/entity-events-dispatcher';

@Module({
  imports: [CqrsModule],
  providers: [CustomLoggerProvider, EntityEventsDispatcher],
  exports: [CustomLoggerProvider, EntityEventsDispatcher],
})
export class CommonModule {}
