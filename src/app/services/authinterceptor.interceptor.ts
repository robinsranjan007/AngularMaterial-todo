import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { HttpServicesService } from './http-services.service';
import { firebaseresponse } from '../modal';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private httpservice:HttpServicesService,private http:HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.httpservice.user.pipe(
      take(1),
      exhaustMap((res) => {
        if(!res)
          {
            return next.handle(request)
          }
        if (res && res?._token) {
          const modifiedReq = request.clone({
            params: new HttpParams().set('auth', res._token),
          });
          return next.handle(modifiedReq);
        }
        return next.handle(request);
      })
    );
  }
}
