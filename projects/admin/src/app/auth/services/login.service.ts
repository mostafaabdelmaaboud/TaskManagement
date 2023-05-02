import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Authlogin, IntLogin } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  constructor() { }
  login(model: IntLogin): Observable<Authlogin> {
    return this.http.post<Authlogin>("https://crud-aagk.onrender.com/auth/login", model);
  }
}
