const appConfig = {
  isDev: process.env.NODE_ENV,
  isTest: process.env.NODE_ENV === 'test',
  port: Number(process.env.PORT) || 3000,
};

export default appConfig;
