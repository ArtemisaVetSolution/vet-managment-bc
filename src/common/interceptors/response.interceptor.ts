import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Body } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { IResponse } from '../interfaces';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor <T, IResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    return next.handle().pipe(
      map(body => {
        const response = context.switchToHttp().getResponse();

        return{
          statusCode: response.statusCode,
          message: body ? "Request was successful": "There is not a body",
          data:  body !== undefined ? body : null
        }
      })
    )
  }
}
