"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
exports.tmiOptions = {
    options: {
        debug: true,
    },
    connection: {
        reconnect: true,
    },
    identity: {
        username: 'Senzuubot',
        password: 'oauth:e2gpzgdcq7iryrv9c1gluswfnwm9mq',
    },
    channels: ['SenzuuBot'],
    logger: logger_1.logglyLogger(),
};
//# sourceMappingURL=tmiOptions.js.map