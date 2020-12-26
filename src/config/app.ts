export const getAsyncAppConfig = () => {
  return {
    appname: process.env.APP_NAME || 'appname',
    isDev: process.env.NODE_ENV,
    isTest: process.env.NODE_ENV === 'test',
    port: Number(process.env.PORT) || 3000,
  };
};

const appConfig = getAsyncAppConfig();

export default appConfig;
