"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var botOptions_1 = require("../config/botOptions");
exports.commandHandler = function (client, timedMessageHost) {
    return function (channel, user, message, self) {
        // Should not respond to itself
        if (self) {
            return;
        }
        var cleanedMessage = message.trim().toLowerCase().split(' ');
        // If not a !senzuubot command, ignore it, it's not for us
        if (cleanedMessage[0] !== botOptions_1.botOptions.cmdPrefix) {
            return;
        }
        var command = cleanedMessage.slice(1).join();
        // Parse Commands
        switch (command) {
            case 'version':
                client.say(channel, "version " + botOptions_1.botOptions.version + ". Errr <bzzzt> Quack quack. Ducks do not have versions.");
                break;
            case 'testmessage':
                client.action(channel, timedMessageHost.getMessage());
                break;
        }
    };
};
//# sourceMappingURL=commandHandler.js.map