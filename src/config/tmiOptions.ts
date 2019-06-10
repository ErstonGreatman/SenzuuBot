import { logglyLogger } from './logger';
import { Options } from 'tmi.js';
import { stringToArray } from '../utils';

export const tmiOptions: Options = {
  options: {
    debug: process.env.NODE_ENV === 'development' ? true : false,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.BOT_PASSWORD
  },
  channels: stringToArray(process.env.BOT_CHANNELS as string),
  logger: logglyLogger(),
};
