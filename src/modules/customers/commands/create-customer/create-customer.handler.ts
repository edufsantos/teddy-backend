import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomersRepository } from 'src/infra/database/repositories/customers/customers.respository';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand, number> {
  constructor(private readonly customerRepo: CustomersRepository) {}

  async execute(command: CreateCustomerCommand): Promise<number> {
    const result = await this.customerRepo.createCustomer({ name: command.name });
    return result.id;
  }
}
