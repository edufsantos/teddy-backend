import { ConfigConstants, LogConstants } from '@common/constants/config';
import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private readonly logLevels: LogLevel[];

  constructor(private readonly configService: ConfigService) {
    super('Global'); // Dfine a default context
    this.logLevels = this.configService.get(ConfigConstants.LOG_LEVEL);
  }

  setContext(context: string) {
    this.context = context;
  }

  private isLogLevelEnabled(level: LogLevel): boolean {
    return this.logLevels.includes(level);
  }

  log(message: string, context?: string) {
    if (this.isLogLevelEnabled(LogConstants.LOG)) {
      if (context) {
        super.log(message, context);
      } else {
        super.log(message);
      }
    }
  }

  error(message: string, trace?: string, context?: string) {
    if (this.isLogLevelEnabled(LogConstants.ERROR)) {
      if (context) {
        super.error(message, trace, context);
      } else {
        super.error(message, trace);
      }
    }
  }

  warn(message: string, context?: string) {
    if (this.isLogLevelEnabled(LogConstants.WARN)) {
      if (context) {
        super.warn(message, context);
      } else {
        super.warn(message);
      }
    }
  }

  debug(message: string, context?: string) {
    if (this.isLogLevelEnabled(LogConstants.DEBUG)) {
      if (context) {
        super.debug(message, context);
      } else {
        super.debug(message);
      }
    }
  }

  verbose(message: string, context?: string) {
    if (this.isLogLevelEnabled(LogConstants.VERBOSE)) {
      if (context) {
        super.verbose(message, context);
      } else {
        super.verbose(message);
      }
    }
  }
}
