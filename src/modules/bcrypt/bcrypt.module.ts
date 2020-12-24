import { Module } from '@nestjs/common';

import { BcryptService } from './bcrypt.service';
import fakeBcryptService from './fakeBcrypt.service';
import appConfig from '@config/app';

@Module({
  providers: [
    {
      provide: BcryptService,
      useClass: appConfig.isTest ? fakeBcryptService : BcryptService,
    },
  ],
  exports: [BcryptService],
})
export class BcryptModule {}
