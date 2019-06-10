import { ONE_MINUTE } from '../consts';

export const botOptions = {
  version: '1.0.0',
  cmdPrefix: '!senzuubot',
  pollingInterval: ONE_MINUTE,
  timedMessageEndpoint: process.env.TIMED_MESSAGES_ENDPOINT,
};
