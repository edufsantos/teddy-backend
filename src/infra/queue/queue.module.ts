import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueConfigService } from './queue.config';

@Module({
  imports: [
    BullModule.forRootAsync({
      useClass: QueueConfigService,
    }),
  ],
  providers: [QueueConfigService],
  exports: [BullModule],
})
export class QueueModule {}
