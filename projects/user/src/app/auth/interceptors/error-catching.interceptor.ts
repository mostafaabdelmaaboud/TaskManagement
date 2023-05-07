import { Inject, Injectable, Injector, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HandleErrorService } from '../../services/handle-error.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  private error = inject(HandleErrorService);
  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      this.error.handleError(err)
      throw err;
    }))
  }
}
