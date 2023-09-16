"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleConfig = exports.commomConfig = exports.setupCurrentLevel = exports.colors = exports.levels = void 0;
const winston_1 = __importDefault(require("winston"));
const loggerMessageFormatter_1 = require("./loggerMessageFormatter");
exports.levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};
exports.colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'cyan'
};
const setupCurrentLevel = () => {
    if (process.env.LOG_LEVEL) {
        return process.env.LOG_LEVEL;
    }
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
exports.setupCurrentLevel = setupCurrentLevel;
exports.commomConfig = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }), winston_1.default.format.metadata({
    fillExcept: ['message', 'level', 'timestamp', 'label']
}));
exports.consoleConfig = winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf(loggerMessageFormatter_1.consoleMessageFormatter));
