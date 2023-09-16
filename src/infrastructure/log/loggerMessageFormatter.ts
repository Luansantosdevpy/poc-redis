import winston from 'winston';
import { levels } from './loggerConfig';

export const consoleMessageFormatter = (info: winston.LogEntry): string => {
  const requestId = info?.metadata?.requestId
    ? ` [${info.metadata.requestId}] `
    : '';

  return `[${info.level}] ${info.timestamp} ->${requestId} ${info.message}`;
};

export const cloudWatchMessageFormatter = (info: winston.LogEntry): string => {
  return `[${info.level.toUpperCase()}] ${info.timestamp} ${JSON.stringify({
    pid: process.pid,
    level: levels[info.level as keyof typeof levels],
    timestamp: new Date(info.timestamp).getTime(),
    message: info.message,
    _log_type: 'application',
    extraInfo: {
      ...info.metadata
    }
  })}`;
};
