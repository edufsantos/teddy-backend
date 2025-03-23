import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CustomersRepository } from 'src/infra/database/repositories/customers/customers.respository';
import { UpdateCustomerCommand } from './update-customer.command';
import { CustomerCreatedEvent } from '../../events/customer-created/customer-created.event';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler implements ICommandHandler<UpdateCustomerCommand, number> {
  constructor(
    private readonly customerRepo: CustomersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<number> {
    const result = await this.customerRepo.update(command.id, { name: command.name });
    if (result.id) {
      await this.eventBus.publish(new CustomerCreatedEvent(result.id));
    }
    return result.id;
  }
}
