"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudWatchMessageFormatter = exports.consoleMessageFormatter = void 0;
const loggerConfig_1 = require("./loggerConfig");
const consoleMessageFormatter = (info) => {
    var _a;
    const requestId = ((_a = info === null || info === void 0 ? void 0 : info.metadata) === null || _a === void 0 ? void 0 : _a.requestId)
        ? ` [${info.metadata.requestId}] `
        : '';
    return `[${info.level}] ${info.timestamp} ->${requestId} ${info.message}`;
};
exports.consoleMessageFormatter = consoleMessageFormatter;
const cloudWatchMessageFormatter = (info) => {
    return `[${info.level.toUpperCase()}] ${info.timestamp} ${JSON.stringify({
        pid: process.pid,
        level: loggerConfig_1.levels[info.level],
        timestamp: new Date(info.timestamp).getTime(),
        message: info.message,
        _log_type: 'application',
        extraInfo: {
            ...info.metadata
        }
    })}`;
};
exports.cloudWatchMessageFormatter = cloudWatchMessageFormatter;
