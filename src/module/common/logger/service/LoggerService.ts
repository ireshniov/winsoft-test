import type { LoggerService as BaseLoggerService } from '@nestjs/common';
import type { Logger } from 'winston';
import { createLogger, format, transports } from 'winston';
import { Format, TransformableInfo } from 'logform';
import TransportStream from 'winston-transport';

export const DEFAULT_CONTEXT = 'AppModule';

export type LoggerMetaType = { context?: string; [optionName: string]: any };
export type ContextOrMetaType = string | LoggerMetaType;

export const customLogFormat: any = format.printf(
  ({
    timestamp,
    level,
    context,
    message,
    ...meta
  }: TransformableInfo & {
    timestamp?: string;
    context?: string;
    meta?: Record<string, any>;
  }) => {
    if (Object.keys(meta).length) {
      message = `${message} ${JSON.stringify(meta)}`;
    }

    if (context) {
      message = `[${context}] ${message}`;
    }

    return `${timestamp || ''} ${level}: ${message}`;
  },
);

export function getFormat(): Format {
  // TODO fetch logging config from configuration
  const logFormat = process.env.LOG_FORMAT_USE_JSON || 'true';
  if (logFormat === 'true') {
    return format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json(),
    );
  } else {
    return format.combine(
      format.timestamp(),
      format.colorize(),
      format.splat(),
      format.errors({ stack: true }),
      format.simple(),
      customLogFormat,
    );
  }
}

export const transportsLayers: TransportStream[] = [
  new transports.Console({
    handleExceptions: true,
    // disable logger in test
    silent: process.env.SILENT_LOGS === 'true',
  }),
];

export const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: getFormat(),
  transports: transportsLayers,
});

export class LoggerService implements BaseLoggerService {
  private readonly logger: Logger;

  constructor(private readonly context: string = DEFAULT_CONTEXT) {
    this.logger = logger;
  }

  debug(message: string, contextOrMeta?: ContextOrMetaType): void {
    this.logger.debug(message, this.getMeta(contextOrMeta));
  }

  log(message: string, contextOrMeta?: ContextOrMetaType): void {
    this.debug(message, this.getMeta(contextOrMeta));
  }

  info(message: string, contextOrMeta?: ContextOrMetaType): void {
    this.logger.info(message, this.getMeta(contextOrMeta));
  }

  warn(message: string, contextOrMeta?: ContextOrMetaType): void {
    this.logger.warn(message, this.getMeta(contextOrMeta));
  }

  error(
    message: string,
    error?: Error,
    contextOrMeta?: ContextOrMetaType,
  ): void {
    this.logger.error(
      this.generateLoggerErrorMeta(message, error, contextOrMeta),
    );
  }

  exception(error: Error, contextOrMeta?: ContextOrMetaType): void {
    this.logger.error(this.generateLoggerExceptionMeta(error, contextOrMeta));
  }

  generateLoggerErrorMeta(
    message: string,
    error?: Error,
    contextOrMeta?: ContextOrMetaType,
  ): Partial<LoggerMetaType> {
    const meta: Partial<LoggerMetaType> = {
      ...this.getMeta(contextOrMeta),
      message,
    };

    if (error) {
      return this.generateLoggerExceptionMeta(error, meta);
    }

    return meta;
  }

  generateLoggerExceptionMeta(
    error: Error,
    contextOrMeta?: ContextOrMetaType,
  ): Partial<LoggerMetaType> {
    let message: string =
      typeof contextOrMeta === 'object' && contextOrMeta?.message
        ? contextOrMeta.message
        : error.message;
    message = typeof message === 'object' ? JSON.stringify(message) : message;
    const meta: Partial<LoggerMetaType> = {
      ...this.getMeta(contextOrMeta),
      message,
    };

    meta.exception = { name: error.name, stack: error.stack };

    return meta;
  }

  getMeta(contextOrMeta?: ContextOrMetaType): LoggerMetaType {
    let meta: Partial<LoggerMetaType> = {
      context:
        typeof contextOrMeta === 'string'
          ? contextOrMeta
          : contextOrMeta?.context
          ? contextOrMeta.context
          : this.context,
    };

    if (typeof contextOrMeta === 'object') {
      meta = { ...contextOrMeta, ...meta };
    }

    return meta;
  }
}
