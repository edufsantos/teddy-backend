import { DefaultQueryPaginatedResponse } from '@common/dtos/default.query';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CustomersResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

export class Customers extends DefaultQueryPaginatedResponse {
  @Expose()
  rows: CustomersResponse[];
}
