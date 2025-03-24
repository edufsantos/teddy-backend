import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { DeleteCustomerCommand } from './delete-customer.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler implements ICommandHandler<DeleteCustomerCommand, number> {
  constructor(private readonly customerRepo: CustomersRepository) {}

  async execute(command: DeleteCustomerCommand): Promise<number> {
    const result = await this.customerRepo.delete(command.id);
    return result;
  }
}
