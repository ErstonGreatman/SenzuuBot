import * as moment from 'moment';

export const botOptions = {
  version: '1.0.0',
  cmdPrefix: '!senzuubot',
  pollingInterval: moment.duration(1, 'minutes'),
  timedMessageEndpoint: process.env.TIMED_MESSAGES_ENDPOINT,
};
