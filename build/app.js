"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tmi = require("tmi.js");
var commandHandler_1 = require("./modules/commandHandler");
var tmiOptions_1 = require("./config/tmiOptions");
var TimedMessageHost_1 = require("./modules/TimedMessageHost");
var botOptions_1 = require("./config/botOptions");
var fetch = require('node-fetch');
/**
 * Startup
 */
var client = tmi.client(tmiOptions_1.tmiOptions);
var timedMessageHost = new TimedMessageHost_1.TimedMessageHost(client);
client.connect();
client.on('connected', function (address, port) {
    console.log("Connected to " + address + " on port: " + port + ".");
    // Start Timed Message Host
    fetch(botOptions_1.botOptions.timedMessageEndpoint)
        .then(function (response) { return response.json(); })
        .then(function (data) { return timedMessageHost.start(data); });
});
/**
 * Handlers
 */
// Handle Chat Actions
client.on('chat', commandHandler_1.commandHandler(client, timedMessageHost));
/**
 * Disconnection/Shutdown
 */
// Disconnected from server
client.on('disconnected', function (reason) {
    console.log("Disconnect. Reason: " + reason);
    // Stop Timed Message Host
    timedMessageHost.stop();
});
//# sourceMappingURL=app.js.map