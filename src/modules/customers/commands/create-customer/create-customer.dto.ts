import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateCustomerDto {
  @Expose()
  id: number;
}
