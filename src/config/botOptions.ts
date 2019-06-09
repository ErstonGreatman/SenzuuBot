import * as moment from 'moment';
import { botJSONEndpoint } from './sensitiveInfo';

export const botOptions = {
  version: '1.0.0',
  cmdPrefix: '!senzuubot',
  pollingInterval: moment.duration(1, 'minutes'),
  timedMessageEndpoint: botJSONEndpoint,
};
