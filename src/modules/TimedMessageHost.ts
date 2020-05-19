import * as tmi from 'tmi.js';

import { botOptions } from '../config/botOptions';
import { ONE_MINUTE } from '../consts';
import fetch = require('node-fetch');


// THIS IS BAD Needs to get dynamically coded in when multi-channel support is added
const streamerName = process.env.BOT_CHANNELS;


/**
 * TimedMessageHost
 * This module displays a random message from a TimedMessageData model at specified intervals
 */
export class TimedMessageHost {
  private client: tmi.Client;
  private poller: NodeJS.Timeout;
  private interval: number;
  private lastMessageTimestamp: number;


  public constructor(client: tmi.Client) {
    this.client = client;
  }

  public start = () => {
    // Start Timed Message Host
    console.log('Starting Timer Message Host Module');

    fetch(botOptions.timedMessageEndpoint)
      .then(response => response.json())
      .then(data => {
        this.interval = data.interval;
        console.log(data);

        this.poller = setInterval(this.onIntervalTick, botOptions.pollingInterval);
      })
      .catch(error => console.log(error));
  };

  public stop = () => clearInterval(this.poller);

  public sendTimedMessage = (channel: string) => this.fetchMessages()
    .then((messages) => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      if (process.env.NODE_ENV === 'development') {
        console.log(`#${channel} ${this.client.getUsername()}: ${message}`);
      } else {
        this.client.action(channel, message);
      }
    });

  private isStreamerOnline = () => fetch(
    `https://api.twitch.tv/helix/streams?user_login=${streamerName}`,
    botOptions.fetchOptions,
  )
    .then(response => response.json())
    .then(resp => resp.data.length)
    .catch(error => console.log(error));

  private fetchMessages = () => fetch(botOptions.timedMessageEndpoint)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.interval = data.interval;
      return data.messages;
    })
    .catch(error => console.log(error));

  private onIntervalTick = async () => {
    // Check if the streamer is online
    if (!await this.isStreamerOnline()) {
      return;
    }

    if (!this.lastMessageTimestamp
        || Date.now() - this.lastMessageTimestamp >= this.interval * ONE_MINUTE) {
      this.lastMessageTimestamp = Date.now();
      await this.sendTimedMessage(streamerName!);
    }
  };
}
