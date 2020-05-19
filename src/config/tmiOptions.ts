import { logglyLogger } from './logger';
import { Options } from 'tmi.js';
import { stringToArray } from '../utils';
import * as dotenv from 'dotenv';

dotenv.config();

export const tmiOptions: Options = {
  options: {
    debug: process.env.NODE_ENV === 'development' ? true : false,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.BOT_ACCOUNT_USERNAME,
    password: process.env.BOT_ACCOUNT_PASSWORD,
  },
  channels: stringToArray(process.env.BOT_CHANNELS as string),
  logger: logglyLogger(),
};
