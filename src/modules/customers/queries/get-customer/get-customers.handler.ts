import { CustomLogger } from '@common/loggers/custom.logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DatabaseProviderService } from 'src/infra/database/database-provider.service';
import { Customer } from 'src/infra/database/entities/cutomer.entity';
import { CustomerDto } from './get-customers.dto';
import { GetCustomerQuery } from './get-customers.queries';
import { NotFoundException } from '@nestjs/common';
import { CustomersRepository } from 'src/infra/database/repositories/customers/customers.respository';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery, CustomerDto> {
  constructor(
    private readonly customerRepo: CustomersRepository,
    private readonly logger: CustomLogger,
  ) {}

  async execute(query: GetCustomerQuery): Promise<CustomerDto> {
    const result = await this.customerRepo.getCustomerById(query.id);
    if (!result) {
      this.logger.error(`Customer with id ${query.id} not found`);
      throw new NotFoundException(`Customer with id ${query.id} not found`);
    }

    this.logger.debug(`Querying customers with search: ${JSON.stringify(result)}`);

    return result;
  }
}
