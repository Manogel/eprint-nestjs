import appConfig from '@config/app';
import redisConfig from '@config/redis';
import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';
@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly client: Redis) {}

  public async save(key: string, value: any): Promise<void> {
    this.client.set(key, JSON.stringify(value), 'EX', redisConfig.cacheTime);
  }

  public async recover<T>(key: string): Promise<T | undefined> {
    const data = await this.client.get(key);

    if (!data) return undefined;

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidade(key: string): Promise<void> {
    await this.client.del(key);
  }

  async getKeysByPrefix(prefix: string) {
    const formattedPrefix = `${appConfig.appname}:${prefix}:*`;

    const keys = (await this.client.keys(formattedPrefix)) as string[];

    const formattedKeys = keys.map((key) =>
      key.replace(`${appConfig.appname}:`, ''),
    );

    return formattedKeys;
  }

  public async invalidadePrefix(prefix: string): Promise<void> {
    const formattedPrefix = `${appConfig.appname}:${prefix}:*`;

    const keys = (await this.client.keys(formattedPrefix)) as string[];

    const formattedKeys = keys.map((key) =>
      key.replace(`${appConfig.appname}:`, ''),
    );

    const pipeline = this.client.pipeline();

    formattedKeys.forEach((key) => pipeline.del(key));

    await pipeline.exec();
  }
}
