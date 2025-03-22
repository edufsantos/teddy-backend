import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

type ExceptionResponse = {
  statusCode: number;
  message: string | ValidationError[];
  error: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ExceptionResponse;

    const [code, meta] = [this.getCode(exceptionResponse), this.getMeta(exceptionResponse)];

    response.status(status).json({
      statusCode: status,
      code,
      meta,
      message: `${meta?.field_name ? meta?.field_name + ' ' : ''}${code}`,
      path: request.url,
    });
  }

  private getCode(exceptionResponse: ExceptionResponse) {
    if (exceptionResponse.message.length && exceptionResponse.message instanceof Array) {
      const message = exceptionResponse.message[0];
      if ('message' in message) {
        return message.message;
      }

      return Object.keys(message.constraints)[0];
    }

    return exceptionResponse.message;
  }

  private getMeta(exceptionResponse: ExceptionResponse) {
    // find first error message

    if (exceptionResponse.message.length && exceptionResponse.message instanceof Array) {
      const message = exceptionResponse.message[0];
      return { field_name: message.property };
    }
    return undefined;
  }
}
