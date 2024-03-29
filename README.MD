# SenzuuBot - A Twitch Chat Bot for Seanzu

A bot developed for <https://www.twitch.tv/Seanzu>. It's really new. Lots to potentially build on.

## Technology

This is a Node.JS app with TypeScript. Why TypeScript? I likes it.

## Current Features

- Reads a JSON file to emote a random message every X minutes (interval specified in the JSON)
- There's a command parser but it doesn't really do anything right now outside of debugging stuffs so it's disabled
- That's... pretty much it. It probably won't see updates unless requested

## Setup

### STILL WRITING THIS OUT

1. Create a Twitch account for the bot
2. Log into <https://twitchapps.com/tmi/> with that Twitch account to generate an OAuth token to use as a password
3. This uses dotenv to create environment variables. It's being deployed on Heroku, so when deployed, set the config vars in there.

You'll need these values/keys in a .env file to run locally:

```text
NODE_ENV = "Can be anything but checks for 'development' when determining debugging features"
BOT_ACCOUNT_USERNAME = "Your bot's name here"
BOT_ACCOUNT_PASSWORD = "The OAuth token from https://twitchapps.com/tmi/"
TIMED_MESSAGES_ENDPOINT = "Wherever you're storing your JSON"
BOT_CHANNELS = "Comma-separated list of channels this bot should be join when connected"
TWITCH_API_CLIENT_ID = "Client-ID used when reaching out to the Twitch API from registering an app at https://dev.twitch.tv/"
TWITCH_API_CLIENT_SECRET = "Your bot's client secret for getting an OAuth tokenf rom the Twitch API"
TWITCH_OAUTH_ENDPOINT = "The Twitch OAuth endpoint. As of last update: https://id.twitch.tv/oauth2/token"
TWITCH_API_ENDPOINT = "Twitch API endpoint. As of last update: https://api.twitch.tv/helix/streams"
```

4. Do the usual `npm install`

## Running

To run locally, run `tsc` in the main folder and then `node build/app.js`. Better scripting to come later.
