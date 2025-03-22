import { Module, Global } from '@nestjs/common';
import { DatabaseProviderService } from './database-provider.service';

@Global()
@Module({
  providers: [DatabaseProviderService],
  exports: [DatabaseProviderService],
})
export class DatabaseModule {}
