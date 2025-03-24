import { CustomLogger } from '@common/loggers/custom.logger';
import { Injectable } from '@nestjs/common';
import { CreateCustomerCommand } from 'src/modules/customers/commands/create-customer/create-customer.command';
import { GetCustomersQuery } from 'src/modules/customers/queries/get-customers/get-customers.queries';
import { DatabaseProviderService } from '../../database-provider.service';
import { Customer } from '../../entities/cutomer.entity';
import { ILike } from 'typeorm';
import { ICustomersRepository } from './customers.contract';

@Injectable()
export class CustomersRepository implements ICustomersRepository {
  constructor(
    private readonly dataSource: DatabaseProviderService,
    private readonly logger: CustomLogger,
  ) {}

  async findAll(query: GetCustomersQuery) {
    const repo = await this.dataSource.getRepository(Customer);
    this.logger.debug(`Querying customers with search: ${JSON.stringify(query)}`);

    const [customers, total] = await repo.findAndCount({
      where: { name: Boolean(query?.name) ? ILike(`%${query.name}%`) : undefined },
      skip: query.skip,
      take: query.take,
    });

    return { customers, total };
  }

  async findById(id: number): Promise<Customer | null> {
    const repo = await this.dataSource.getRepository(Customer);
    this.logger.debug(`Fetching customer with ID: ${id}`);
    const customer = await repo.findOne({ where: { id } });
    return customer || null;
  }

  async create(customerData: CreateCustomerCommand) {
    const repo = await this.dataSource.getRepository(Customer);
    const save = await repo.save({
      name: customerData.name,
    });
    return save;
  }

  async update(id: number, customerData: Partial<CreateCustomerCommand>): Promise<Customer> {
    const repo = await this.dataSource.getRepository(Customer);
    this.logger.debug(`Updating customer with ID: ${id} and data: ${JSON.stringify(customerData)}`);

    const customer = await repo.findOne({ where: { id } });
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }

    Object.assign(customer, customerData);
    const updatedCustomer = await repo.save(customer);
    return updatedCustomer;
  }

  async delete(id: number): Promise<number> {
    const repo = await this.dataSource.getRepository(Customer);
    const customer = await repo.delete({ id });
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    return customer.affected;
  }
}
