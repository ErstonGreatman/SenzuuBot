import * as tmi from 'tmi.js';

import { botOptions } from '../config/botOptions';

import fetch = require('node-fetch');
import { ONE_MINUTE } from '../consts';


// THIS IS BAD Needs to get dynamically coded in when multi-channel support is added
const streamerName = 'SenzuDuck';


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
  .then(resp => !resp.data.length)  
  .catch(error => console.log(error));

  private fetchMessages = () => fetch(botOptions.timedMessageEndpoint)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.interval = data.interval;
      return data.messages;
    })
    .catch(error => console.log(error));

  private onIntervalTick = () => {
    // Check if the streamer is online
    if (!this.isStreamerOnline()) {
      return;
    }

    if (!this.lastMessageTimestamp
        || Date.now() - this.lastMessageTimestamp >= this.interval * ONE_MINUTE) {
        this.lastMessageTimestamp = Date.now();
        this.client.action(streamerName, this.getMessage());
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

  public getMessage = () => this.fetchMessages()
    .then((messages) =>{
      const rng = Math.floor(Math.random() * .messages.length);
      return messages[rng];
    });
};
