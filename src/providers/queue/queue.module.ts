import appConfig from '@config/app';
import { getAsyncRedisConfig } from '@config/redis';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailModule } from '@providers/mail/mail.module';
import { MailProcessor } from '@providers/mail/mail.processor';
import { FakeQueueService } from './fakeQueue.service';
import { QueueService } from './queue.service';

let imports = [];
let processors = [];

if (!appConfig.isTest) {
  imports = [
    BullModule.forRootAsync({
      useFactory: () => {
        const { config } = getAsyncRedisConfig();
        return {
          redis: config,
        };
      },
    }),
    BullModule.registerQueue({
      name: 'mail',
    }),
    MailModule,
  ];

  processors = [MailProcessor];
}

@Module({
  imports,
  providers: [
    {
      provide: QueueService,
      useClass: appConfig.isTest ? FakeQueueService : QueueService,
    },
    ...processors,
  ],
  exports: [QueueService],
})
export class QueueModule {}
