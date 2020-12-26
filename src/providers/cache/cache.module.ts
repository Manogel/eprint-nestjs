import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { getAsyncRedisConfig } from '@config/redis';
import { FakeCacheService } from './fakeCache.service';
import appConfig from '@config/app';

const imports = [];

if (!appConfig.isTest) {
  imports.push(
    RedisModule.forRootAsync({
      useFactory: () => {
        const { config } = getAsyncRedisConfig();
        return {
          config,
        };
      },
    }),
  );
}

@Module({
  imports,
  providers: [
    {
      provide: CacheService,
      useClass: appConfig.isTest ? FakeCacheService : CacheService,
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
