import { Env } from '@common/config/env';
import { BullRootModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueueConfigService implements SharedBullConfigurationFactory {
  constructor(private readonly configService: ConfigService<Env>) {}
  createSharedConfiguration(): Promise<BullRootModuleOptions> | BullRootModuleOptions {
    return {
      redis: this.configService.get('REDIS_URL'),
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 1000,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    };
  }
}
