import * as loggly from 'loggly';

export const logglyLogger = () => {
  const logger = loggly.createClient({
    token: '9b4027b9-99db-4e69-bc6c-f4d2803552c7',
    subdomain: 'erstongreatman',
    tags: ['Winston-NodeJS'],
    json: true,
  });

  const writeLog = (type: string) => (message: string) => logger.log(
    message,
    ['SenzuuBot', type],
    () => console.log(message),
  );

  return {
    info: writeLog('Info'),
    warn: writeLog('Warning'),
    error: writeLog('Error'),
  };
};
