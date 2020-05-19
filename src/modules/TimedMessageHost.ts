import * as tmi from 'tmi.js';

import { botOptions } from '../config/botOptions';

import fetch = require('node-fetch');
import { ONE_MINUTE } from '../consts';


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


  public constructor (client: tmi.Client) {
    this.client = client;
  }

  private isStreamerOnline = () => fetch(`https://api.twitch.tv/helix/streams?user_login=${streamerName}`, {
    headers: {
      'Client-ID': process.env.TWITCH_API_CLIENT_ID,
    },
  })
  .then(response => response.json())
  .then(resp => { console.log(resp.data); return resp.data.length; })
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
        this.sendTimedMessage(streamerName!);
    }
  };


  public start = () => {
    // Start Timed Message Host
    fetch(botOptions.timedMessageEndpoint)
    .then(response => response.json())
    .then(data => {
      this.interval = data.interval;
      console.log(data);

      this.poller = setInterval(this.onIntervalTick, botOptions.pollingInterval);
    })
    .catch(error => console.log(error));
  }
  public stop = () => clearInterval(this.poller);

  public sendTimedMessage = (channel: string) => this.fetchMessages()
    .then((messages) => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      this.client.action(channel, message);
    });
};
