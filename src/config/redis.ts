import appConfig from './app';

type ICacheParam = string | number;

export const getAsyncRedisConfig = () => {
  return {
    config: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined,
      keyPrefix: `${appConfig.appname}:`,
    },
    cacheTime: 86400,

    keys: {
      userChannel: (userId: ICacheParam) => `socket:channel@${userId}`,
    },
  };
};

const redisConfig = getAsyncRedisConfig();

export default redisConfig;
