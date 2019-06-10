import * as tmi from 'tmi.js';

import { commandHandler } from './modules/commandHandler';
import { tmiOptions } from './config/tmiOptions';
import { TimedMessageHost } from './modules/TimedMessageHost';
import { botOptions } from './config/botOptions';

import fetch = require('node-fetch');


/**
 * Startup
 */
const client = tmi.client(tmiOptions);
const timedMessageHost = new TimedMessageHost(client);

client.connect();

client.on('connected', (address, port) => {
  console.log(`Connected to ${address} on port: ${port}.`);

  // Start Timed Message Host
  fetch(botOptions.timedMessageEndpoint)
  .then(response => response.json())
  .then(data => timedMessageHost.start(data));
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
