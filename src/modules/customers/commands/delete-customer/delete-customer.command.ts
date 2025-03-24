import { Exclude } from 'class-transformer';

@Exclude()
export class DeleteCustomerCommand {
  id?: number;
}
