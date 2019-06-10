import * as tmi from 'tmi.js';

import { botOptions } from '../config/botOptions';

import fetch = require('node-fetch');
import { ONE_MINUTE } from '../consts';


/**
 * TimedMessageData
 * The model for messages displayed on a timed basis, provided by a JSON file hosted on JSONbin.io
 */
export interface TimedMessage {
  interval: number,
  messages: string[],
};

// THIS IS BAD Needs to get dynamically coded in when multi-channel support is added
const streamerName = 'SenzuDuck';


/**
 * TimedMessageHost
 * This module displays a random message from a TimedMessageData model at specified intervals
 */
export class TimedMessageHost {
  private client: tmi.Client;
  private poller: NodeJS.Timeout;
  private timedMessage: TimedMessage;
  private lastMessageTimestamp: number;


  public constructor (client: tmi.Client) {
    this.client = client;
  }
  
  private onIntervalTick = () => {
    // Check if the streamer is online
    fetch(`https://api.twitch.tv/helix/streams?user_login=${streamerName}`, {
      headers: {
        'Client-ID': 'v0b8uu1fkbcsl8nbwji3j1gknsn96w',
      },
    })
    .then(response => response.json())
    .then(resp => {
      if (!resp.data.length) {
        return;
      }

      if (!this.lastMessageTimestamp
         || Date.now() - this.lastMessageTimestamp >= this.timedMessage.interval * ONE_MINUTE) {
          this.lastMessageTimestamp = Date.now();
          this.client.action(streamerName, this.getMessage());
      }
    })
    .catch(error => console.log(error));
  };

  public start = (timedMessage: TimedMessage) => {
    this.timedMessage = timedMessage;
    console.log(timedMessage);
    
    this.poller = setInterval(this.onIntervalTick, botOptions.pollingInterval);
  }
  public stop = () => clearInterval(this.poller);

  public getMessage = () => {
    const rng = Math.floor(Math.random() * this.timedMessage.messages.length);
    return this.timedMessage.messages[rng];
  };
};
