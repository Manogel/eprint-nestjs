import appConfig from '@config/app';
import { Module } from '@nestjs/common';
import { CacheModule } from '@providers/cache/cache.module';
import { FakeSocketioGateway } from './fakeSockeio.gateway';
import { SocketioGateway } from './socketio.gateway';

@Module({
  imports: [CacheModule],
  providers: [
    {
      provide: SocketioGateway,
      useClass: appConfig.isTest ? FakeSocketioGateway : SocketioGateway,
    },
  ],
  exports: [SocketioGateway],
})
export class SocketioModule {}
