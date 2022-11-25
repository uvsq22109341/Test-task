import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const resCode = context.switchToHttp().getResponse().statusCode;
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      catchError((err) => {
        if (false) {
          return 'ok';
        }
        return throwError(() => {
          if (err.status == 400)
            console.log(`request-id = ${req.headers['x-request-id']} et
            ${err.response.message} est la cause `);
          if (err.status == 500)
            console.log(`request-id = ${req.headers['x-request-id']} et
            l'erreur est interne `);
          return err;
        });
      }),
    );
  }
}
