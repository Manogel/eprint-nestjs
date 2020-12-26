import { Module } from '@nestjs/common';
import { CacheModule } from '@providers/cache/cache.module';
import { SocketioGateway } from './socketio.gateway';

@Module({
  imports: [CacheModule],
  providers: [SocketioGateway],
  exports: [SocketioGateway],
})
export class SocketioModule {}
