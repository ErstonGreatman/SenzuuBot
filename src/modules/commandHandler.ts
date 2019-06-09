import * as tmi from 'tmi.js';
import { botOptions } from '../config/botOptions';
import { TimedMessageHost } from './TimedMessageHost';

export const commandHandler = (client: tmi.Client, timedMessageHost: TimedMessageHost) =>
  (channel: string, user: tmi.ChatUserstate, message: string, self: boolean) => {
  // Should not respond to itself
  if (self) {
    return;
  }

  const cleanedMessage = message.trim().toLowerCase().split(' ');

  // If not a !senzuubot command, ignore it, it's not for us
  if (cleanedMessage[0] !== botOptions.cmdPrefix) {
    return;
  }

  const command = cleanedMessage.slice(1).join();

  // Parse Commands
  switch (command) {
    case 'version':
      client.say(channel, `version ${botOptions.version}. Errr <bzzzt> Quack quack. Ducks do not have versions.`);
      break;
    case 'testmessage':
      client.action(channel, timedMessageHost.getMessage());
      break;
  }
};
