import { CreateCustomerCommand } from 'src/modules/customers/commands/create-customer/create-customer.command';
import { GetCustomersQuery } from 'src/modules/customers/queries/get-customers/get-customers.queries';
import { Customer } from '../../entities/cutomer.entity';

export abstract class ICustomersRepository {
  abstract findAll(query: GetCustomersQuery): Promise<{ customers: Customer[]; total: number }>;

  abstract findById(id: number): Promise<Customer | null>;

  abstract create(customerData: CreateCustomerCommand): Promise<Customer>;

  abstract update(id: number, customerData: Partial<CreateCustomerCommand>): Promise<Customer>;

  abstract delete(id: number): Promise<void>;
}
