import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DeleteCustomerCommand {
  @Expose()
  id?: number;
}
