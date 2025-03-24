import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class UpdateCustomerCommand {
  @Expose()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumber()
  salary: number;

  @Expose()
  @IsNumber()
  company_price: number;
}
