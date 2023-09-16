"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const loggerConfig_1 = require("./loggerConfig");
winston_1.default.addColors(loggerConfig_1.colors);
const transports = [
    new winston_1.default.transports.Console({
        format: loggerConfig_1.consoleConfig
    })
];
const Logger = winston_1.default.createLogger({
    level: (0, loggerConfig_1.setupCurrentLevel)(),
    levels: loggerConfig_1.levels,
    format: loggerConfig_1.commomConfig,
    transports
});
exports.default = Logger;
Logger.debug('Logger initialized');
