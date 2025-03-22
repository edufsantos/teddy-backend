import { Global, Module } from '@nestjs/common';
import { CustomersRepository } from './customers/customers.respository';

@Global()
@Module({
  providers: [CustomersRepository],
  exports: [CustomersRepository],
})
export class RepositoryModule {}
