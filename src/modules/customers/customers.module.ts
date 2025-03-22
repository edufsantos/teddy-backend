import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';

@Module({
  imports: [CqrsModule],
  controllers: [CustomersController],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class CustomersModule {}
