import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateCustomerCommand {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
