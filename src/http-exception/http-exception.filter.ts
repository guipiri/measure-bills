import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let error_description = exception.getResponse();
    const name = exception.message;

    let error_code: string;
    if (request.path === '/upload') {
      switch (status) {
        case 400:
          error_code = 'INVALID_DATA';
          break;
        case 409:
          error_code = 'DOUBLE_REPORT';
          error_description = 'Leitura do mês já realizada';
          break;
      }
    } else if (request.path.includes('/list')) {
      switch (status) {
        case 400:
          error_code = 'INVALID_TYPE';
          error_description = 'Tipo de medição não permitida';
          break;
        case 404:
          error_code = 'MEASURES_NOT_FOUND';
          error_description = 'Nenhuma leitura encontrada';
          break;
      }
    }
    response.status(status).json({
      error_code: error_code ? error_code : name,
      error_description,
    });
  }
}
