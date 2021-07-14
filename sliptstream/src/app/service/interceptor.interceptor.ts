import { Injectable, Injector } from '@angular/core';
import { HttpService } from './http.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const serv = this.injector.get(HttpService);
    const tokenizedReq = request.clone({
      setHeaders: {
        request: `test`
      }
    });
    console.log(tokenizedReq)
    return next.handle(tokenizedReq);
  }
}
