import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const reqLogin = !request.url.includes("auth/login");
    const token = localStorage.getItem("token");
    let modifiedUrl = request;
    if (token) {
      modifiedUrl = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token)
      })
    }
    return next.handle(modifiedUrl);
  }
}
