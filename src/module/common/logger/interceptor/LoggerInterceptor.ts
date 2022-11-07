import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from '../service/LoggerService';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const method: string = req.method;
    const url: string = req.url;
    const now: number = Date.now();
    const logger: LoggerService = new LoggerService(context.getClass().name);

    function getLogParams(statusCode: number): Record<string, any> {
      return {
        path: req.route.path,
        method,
        statusCode,
        url,
        responseTime: Math.max(Date.now() - now, 1),
      };
    }

    return next
      .handle()
      .pipe(
        tap(() => {
          if (process.env.HTTPLOG_DISABLED !== 'true') {
            const res: Response = context.switchToHttp().getResponse();
            const statusCode: number = res.statusCode;
            logger.info(``, getLogParams(statusCode));
          }
        }),
      )
      .pipe(
        catchError((error: any): any => {
          let statusCode: number;

          if (error instanceof HttpException) {
            statusCode = error.getStatus();
          } else {
            statusCode =
              error.message?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
          }

          if (statusCode >= 400) {
            logger.exception(error, getLogParams(statusCode));
          } else {
            logger.info(``, getLogParams(statusCode));
          }

          return throwError(error);
        }),
      );
  }
}
