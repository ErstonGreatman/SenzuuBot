"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var fetch = require('node-fetch');
;
var streamerName = 'SenzuuBot';
/**
 * TimedMessageHost
 * This module displays a random message from a TimedMessageData model at specified intervals
 */
var TimedMessageHost = /** @class */ (function () {
    function TimedMessageHost(client) {
        var _this = this;
        this.onIntervalTick = function () {
            // Check if the streamer is online
            fetch("https://api.twitch.tv/helix/streams?user_login=" + streamerName, {
                headers: {
                    'Client-ID': 'v0b8uu1fkbcsl8nbwji3j1gknsn96w',
                },
            })
                .then(function (response) { return response.json(); })
                .then(function (resp) {
                console.log(resp);
                if (!resp.data.length) {
                    console.log(streamerName + " is not streaming.");
                    return;
                }
                // Check for duration between last post and current time
                if (!_this.lastMessageTimestamp
                    || moment.duration(_this.lastMessageTimestamp.diff(moment.now())) >= _this.timedMessage.interval) {
                    _this.client.action(streamerName, _this.getMessage());
                }
            });
        };
        this.start = function (timedMessage) {
            _this.timedMessage = timedMessage;
            console.log(timedMessage);
            _this.poller = setInterval(_this.onIntervalTick, 10000); //botOptions.pollingInterval.asMilliseconds());
        };
        this.stop = function () { return clearInterval(_this.poller); };
        this.getMessage = function () {
            var rng = Math.floor(Math.random() * _this.timedMessage.messages.length);
            console.log(rng);
            return _this.timedMessage.messages[rng];
        };
        this.client = client;
    }
    return TimedMessageHost;
}());
exports.TimedMessageHost = TimedMessageHost;
;
//# sourceMappingURL=TimedMessageHost.js.map