import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class DefaultQuery {
  @Expose()
  @Transform(({ value }) => {
    return Number(value || 0);
  })
  skip: number;

  @Expose()
  @Transform(({ value }) => Math.min(Number(value || 30), 100))
  take: number;
}

@Exclude()
export class DefaultQueryPaginatedResponse {
  @Expose()
  @Transform(({ value }) => Number(value || 0))
  count: number;

  @Expose()
  @Transform(({ value }) => Number(value || 0))
  skip: number;

  @Expose()
  @Transform(({ value }) => Math.min(Number(value || 30), 100))
  take: number;
}
