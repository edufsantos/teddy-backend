import { DefaultQuery } from '@common/dtos/default.query';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
class Search {
  @Expose()
  name?: string;
}

@Exclude()
export class GetCustomersQuery extends DefaultQuery {
  @Expose()
  name?: string;
}
