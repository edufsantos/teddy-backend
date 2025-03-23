import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { EventsHandlers } from './events';
import { QueueConsumers } from './queues';
import { BullModule } from '@nestjs/bull';
import { QueueProcessorConstants } from '@common/constants/config';

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueue({ name: QueueProcessorConstants.CREATE_CUSTOMERS }), //TODO: abstract this to a config service
  ],
  controllers: [CustomersController],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventsHandlers, ...QueueConsumers],
})
export class CustomersModule {}
