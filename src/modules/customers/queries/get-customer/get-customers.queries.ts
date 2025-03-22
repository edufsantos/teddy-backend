import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetCustomerQuery {
  @Expose()
  @Transform(({ value }) => (isNaN(Number(value)) ? null : Number(value)))
  id: number;
}
