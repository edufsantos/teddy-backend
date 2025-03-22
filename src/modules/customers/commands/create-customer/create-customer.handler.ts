import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from './create-customer.command';
import { CreateCustomerDto } from './create-customer.dto';
import { CustomLogger } from '@common/loggers/custom.logger';
import { CustomersRepository } from 'src/infra/database/repositories/customers/customers.respository';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand, CreateCustomerDto> {
  constructor(
    private readonly customerRepo: CustomersRepository,
    private readonly logger: CustomLogger,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<CreateCustomerDto> {
    const result = await this.customerRepo.createCustomer({ name: command.name });
    return {
      id: result.id,
    };
  }
}
