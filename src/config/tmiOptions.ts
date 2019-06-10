import { logglyLogger } from './logger';
import { Options } from 'tmi.js';
import { stringToArray } from '../utils';

export const tmiOptions: Options = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: process.env.botUsername,
    password: process.env.botPassword
  },
  channels: stringToArray(process.env.BOT_CHANNELS as string),
  logger: logglyLogger(),
};
