"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loggly = require("loggly");
exports.logglyLogger = function () {
    var logger = loggly.createClient({
        token: "9b4027b9-99db-4e69-bc6c-f4d2803552c7",
        subdomain: "erstongreatman",
        tags: ["Winston-NodeJS"],
        json: true,
    });
    var writeLog = function (type) { return function (message) { return logger.log(message, ['SenzuuBot', type], function () { return console.log(message); }); }; };
    return {
        info: writeLog('Info'),
        warn: writeLog('Warning'),
        error: writeLog('Error'),
    };
};
//# sourceMappingURL=logger.js.map