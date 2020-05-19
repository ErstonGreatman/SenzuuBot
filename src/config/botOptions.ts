import { ONE_MINUTE } from '../consts';

export const botOptions = {
  version: '1.0.0',
  cmdPrefix: '!senzuubot',
  authToken: {},
  fetchOptions: {
    headers: {
      'Client-ID': process.env.TWITCH_API_CLIENT_ID,
      'Authorization': `Bearer ${process.env.OAUTH_TOKEN}`,
    },
  },
  pollingInterval: ONE_MINUTE,
  timedMessageEndpoint: process.env.TIMED_MESSAGES_ENDPOINT,
};
