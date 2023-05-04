import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Error } from 'mongoose';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private applyExceptionResponse(exception: Error, status: HttpStatus, response: Response, request?: Request): void {
    response.status(status).json({
      name: exception.name,
      message: exception.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request?.url,
    });
  }

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    switch (true) {
      case exception instanceof HttpException:
        const status = (<HttpException>exception).getStatus();
        (<any>response).status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      case exception instanceof Error.ValidationError:
        this.applyExceptionResponse(exception, HttpStatus.BAD_REQUEST, response, request);
        break;
      default:
        this.applyExceptionResponse(exception, HttpStatus.INTERNAL_SERVER_ERROR, response, request);
        break;
    }
  }
}
