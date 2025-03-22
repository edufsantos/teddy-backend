import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CustomerDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
