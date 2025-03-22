import { PartialType } from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';
import { CreateCustomerCommand } from '../create-customer/create-customer.command';

@Exclude()
export class UpdateCustomerDto extends PartialType(CreateCustomerCommand) {}
