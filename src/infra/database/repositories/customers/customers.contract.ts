import { CreateCustomerCommand } from 'src/modules/customers/commands/create-customer/create-customer.command';
import { GetCustomersQuery } from 'src/modules/customers/queries/get-customers/get-customers.queries';
import { Customer } from '../../entities/cutomer.entity';

export abstract class ICustomersRepository {
  abstract getAllCustomers(query: GetCustomersQuery): Promise<{ customers: Customer[]; total: number }>;

  abstract getCustomerById(id: number): Promise<Customer | null>;

  abstract createCustomer(customerData: CreateCustomerCommand): Promise<Customer>;

  abstract updateCustomer(id: number, customerData: Partial<CreateCustomerCommand>): Promise<Customer>;

  abstract deleteCustomer(id: number): Promise<void>;
}
