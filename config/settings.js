export const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const settings = {
  mail: {
    smtp: {
      host: 'mail.thekillcode.com',
      port: 465,
      secure: true,
      auth: {
        user: 'pavf@thekillcode.com',
        pass: ';yfoZT*-s]7M',
      },
    },
  },
  env:{},
};

export default settings;
