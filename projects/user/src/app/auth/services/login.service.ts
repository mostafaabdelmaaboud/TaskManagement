import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth, IntLogin, IntRegister } from '../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  constructor() { }
  login(model: IntLogin): Observable<Auth> {
    return this.http.post<Auth>(`${environment.baseApi}/auth/login`, model);
  }
  register(model: IntRegister): Observable<Auth> {
    debugger;
    return this.http.post<Auth>(`${environment.baseApi}/auth/createAccount`, model);
  }
}
