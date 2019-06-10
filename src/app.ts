import * as tmi from 'tmi.js';

import { commandHandler } from './modules/commandHandler';
import { tmiOptions } from './config/tmiOptions';
import { TimedMessageHost } from './modules/TimedMessageHost';


/**
 * Startup
 */
console.log(`Starting in ${process.env.NODE_ENV}`);
console.log(`Connecting as: ${tmiOptions.identity!.username}`)
const client = tmi.client(tmiOptions);
const timedMessageHost = new TimedMessageHost(client);

client.connect();

client.on('connected', (address, port) => {
  console.log(`Connected to ${address} on port: ${port}.`);

  // Start Timed Message Host
  timedMessageHost.start();
});

/**
 * Handlers
 */
// Handle Chat Actions
// client.on('chat', commandHandler(client, timedMessageHost));

/**
 * Disconnection/Shutdown
 */
// Disconnected from server
client.on('disconnected', (reason: string) => {
  console.log(`Disconnect. Reason: ${reason}`);

  // Stop Timed Message Host
  timedMessageHost.stop();
});
