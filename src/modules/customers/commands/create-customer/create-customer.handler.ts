import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { CreateCustomerCommand } from './create-customer.command';
import { CustomerCreatedEvent } from '../../events/customer-created/customer-created.event';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand, number> {
  constructor(
    private readonly customerRepo: CustomersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<number> {
    const result = await this.customerRepo.create({ name: command.name });
    if (result.id) {
      await this.eventBus.publish(new CustomerCreatedEvent(result.id));
    }
    return result.id;
  }
}
