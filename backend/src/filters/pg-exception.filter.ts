import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { DatabaseError } from 'pg';
import { PG_ERROR_MAP } from '../constant';

@Catch(DatabaseError)
export class PgExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PgExceptionFilter.name);

  catch(exception: DatabaseError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const code = exception.code;
    const message = exception.message.replace(/\n/g, '');

    if (!code || !PG_ERROR_MAP[code]) {
      this.handleUnhandledPgError(exception, message, host);
      return;
    }

    const status = PG_ERROR_MAP[code];
    response
      .status(status)
      .json({ statusCode: status, errorCode: code, message });
  }

  private handleUnhandledPgError(
    exception: DatabaseError,
    message: string,
    host: ArgumentsHost,
  ) {
    this.logger.error(
      `Unhandled PG error: ${exception.code} - ${message}`,
      exception.stack,
    );
    super.catch(exception, host);
  }
}
