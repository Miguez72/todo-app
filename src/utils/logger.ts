/**
 * Utility for environment-aware logging
 * Only logs in development mode, silent in production
 */

type LogLevel = 'log' | 'warn' | 'error' | 'info';

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private log(level: LogLevel, message: string, ...args: unknown[]) {
    if (this.isDevelopment) {
      console[level](`[${level.toUpperCase()}]`, message, ...args);
    }
  }

  info(message: string, ...args: unknown[]) {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    this.log('error', message, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    this.log('log', message, ...args);
  }
}

export const logger = new Logger();
