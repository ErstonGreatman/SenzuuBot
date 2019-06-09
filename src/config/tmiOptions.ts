import { logglyLogger } from './logger';
import { Options } from 'tmi.js';
import { tmiIdentity } from './sensitiveInfo';

export const tmiOptions: Options = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
  },
  identity: tmiIdentity,
  channels: ['SenzuuBot'],
  logger: logglyLogger(),
};
