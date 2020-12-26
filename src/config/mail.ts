export const getAsyncMailConfig = () => {
  return {
    driver: process.env.MAIL_DRIVER || 'smtp',

    connection: {
      port: process.env.MAIL_PORT,
      host: process.env.MAIL_HOST,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },

    defaults: {
      from: {
        email: process.env.MAIL_FROM || 'company@company.com',
        name: process.env.MAIL_NAME || 'My Company Name',
      },
    },
  };
};

const mailConfig = getAsyncMailConfig();

export default mailConfig;
