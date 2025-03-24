import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CustomerDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  salary: number;

  @Expose()
  company_price: number;
}
