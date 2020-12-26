import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { getAsyncRedisConfig } from '@config/redis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => {
        const { config } = getAsyncRedisConfig();
        return {
          config,
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
