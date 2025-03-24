import { CustomLogger } from '@common/loggers/custom.logger';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { CustomerDto } from './get-customers.dto';
import { GetCustomerQuery } from './get-customers.queries';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery, CustomerDto> {
  constructor(
    private readonly customerRepo: CustomersRepository,
    private readonly logger: CustomLogger,
  ) {}

  async execute(query: GetCustomerQuery): Promise<CustomerDto> {
    const result = await this.customerRepo.findById(query.id);
    if (!result) {
      this.logger.error(`Customer with id ${query.id} not found`);
      throw new NotFoundException(`Customer with id ${query.id} not found`);
    }

    this.logger.debug(`Querying customers with search: ${JSON.stringify(result)}`);

    return result;
  }
}
