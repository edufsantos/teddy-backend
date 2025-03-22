import { CreateCustomerHandler } from './create-customer/create-customer.handler';
import { UpdateCustomerHandler } from './update-customer/update-customer.handler';

export const CommandHandlers = [CreateCustomerHandler, UpdateCustomerHandler];
