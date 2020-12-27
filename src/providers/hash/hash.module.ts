import { Module } from '@nestjs/common';

import { HashService } from './hash.service';
import fakeHashService from './fakeHash.service';
import appConfig from '@config/app';

@Module({
  providers: [
    {
      provide: HashService,
      useClass: appConfig.isTest ? fakeHashService : HashService,
    },
  ],
  exports: [HashService],
})
export class HashModule {}
