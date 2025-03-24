import { CreateCustomerHandler } from './create-customer/create-customer.handler';
import { DeleteCustomerHandler } from './delete-customer/delete-customer.handler';
import { UpdateCustomerHandler } from './update-customer/update-customer.handler';

export const CommandHandlers = [CreateCustomerHandler, UpdateCustomerHandler, DeleteCustomerHandler];
