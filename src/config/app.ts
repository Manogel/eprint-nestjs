export const getAsyncAppConfig = () => {
  return {
    isDev: process.env.NODE_ENV,
    isTest: process.env.NODE_ENV === 'test',
    port: Number(process.env.PORT) || 3000,
  };
};

const appConfig = getAsyncAppConfig();

export default appConfig;
