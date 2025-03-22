import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateCustomerCommand {
  id?: string;

  @Expose()
  name: string;
}
