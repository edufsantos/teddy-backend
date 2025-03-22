import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomersRepository } from 'src/infra/database/repositories/customers/customers.respository';
import { UpdateCustomerCommand } from './update-customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler implements ICommandHandler<UpdateCustomerCommand, number> {
  constructor(private readonly customerRepo: CustomersRepository) {}

  async execute(command: UpdateCustomerCommand): Promise<number> {
    const result = await this.customerRepo.updateCustomer(command.id, { name: command.name });
    return result.id;
  }
}
