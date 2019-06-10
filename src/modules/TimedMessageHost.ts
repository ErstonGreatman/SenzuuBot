import * as moment from 'moment';
import * as tmi from 'tmi.js';

import { botOptions } from '../config/botOptions';

import fetch = require('node-fetch');


/**
 * TimedMessageData
 * The model for messages displayed on a timed basis, provided by a JSON file hosted on JSONbin.io
 */
export interface TimedMessage {
  interval: moment.Duration,
  messages: string[],
};


const streamerName = 'SenzuuBot';


/**
 * TimedMessageHost
 * This module displays a random message from a TimedMessageData model at specified intervals
 */
export class TimedMessageHost {
  private client: tmi.Client;
  private poller: NodeJS.Timeout;
  private timedMessage: TimedMessage;
  private lastMessageTimestamp: moment.Moment;


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

      // Check for duration between last post and current time
      if (!this.lastMessageTimestamp
        || moment.duration(this.lastMessageTimestamp.diff(moment.now())) >= this.timedMessage.interval) {
        this.client.action(streamerName, this.getMessage());
      }
    });
  };

  public start = (timedMessage: TimedMessage) => {
    this.timedMessage = timedMessage;
    console.log(timedMessage);
    
    this.poller = setInterval(this.onIntervalTick, botOptions.pollingInterval.asMilliseconds());
  }
  public stop = () => clearInterval(this.poller);

  public getMessage = () => {
    const rng = Math.floor(Math.random() * this.timedMessage.messages.length);
    console.log(rng);
    return this.timedMessage.messages[rng];
  };
};
