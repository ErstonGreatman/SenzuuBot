import * as tmi from 'tmi.js';
import { tmiOptions } from './config/tmiOptions';
import { TimedMessageHost } from './modules/TimedMessageHost';
import { botOptions } from './config/botOptions';
import fetch = require('node-fetch');


/**
 * Startup
 */
console.log(`Starting bot in ${process.env.NODE_ENV}`);
console.log(`Connecting to IRC as: ${tmiOptions.identity!.username}`);
const client = tmi.client(tmiOptions);
const timedMessageHost = new TimedMessageHost(client);

client.connect();

client.on('connected', (address, port) => {
  console.log(`Connected to ${address} on port: ${port}.`);

  // Authorize both with Twitch API
  initAPI()
    .then(() => {
      // Start bot modules
      console.log('Starting modules...')

      // Start Timed Message Host
      timedMessageHost.start();

      /**
       * Handlers
       */
      // Handle Chat Actions
      // client.on('chat', commandHandler(client, timedMessageHost));
    })
    .catch(err => console.log(err));
});

/**
 * Disconnection/Shutdown
 */
// Disconnected from server
client.on('disconnected', (reason: string) => {
  console.log(`Disconnect. Reason: ${reason}`);

  // Stop Timed Message Host
  timedMessageHost.stop();
});

const initAPI = async () => {
  await fetch(
    `${process.env.TWITCH_OAUTH_ENDPOINT}?client_id=${process.env.TWITCH_API_CLIENT_ID}` +
    `&client_secret=${process.env.TWITCH_API_CLIENT_SECRET}&grant_type=client_credentials`,
    {
      method: 'POST',
    }
  )
    .then(resp => resp.json())
    .then(token => {
      botOptions.authToken = token;
      botOptions.fetchOptions.headers.Authorization = `Bearer ${token.access_token}`;
    });
  console.log('Bot received auth from Twitch API.');
};
