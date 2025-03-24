import { CustomLogger } from '@common/loggers/custom.logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { Customers } from './get-customers.dto';
import { GetCustomersQuery } from './get-customers.queries';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery, Customers> {
  constructor(
    private readonly customersRepo: CustomersRepository,
    private readonly logger: CustomLogger,
  ) {}

  async execute(query: GetCustomersQuery): Promise<Customers> {
    this.logger.debug(`Querying customers with search: ${JSON.stringify(query)}`);

    const { skip, take } = query;
    const result = await this.customersRepo.findAll(query);

    return {
      rows: result.customers,
      count: result.total,
      skip,
      take,
    };
  }
}
