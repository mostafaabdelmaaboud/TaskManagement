import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from './store/state/login.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = localStorage.getItem("token");
    if (authToken && (state.url === "/login" || state.url === "/register")) {
      this.router.navigate(["/dashboard"]);
      return false;
    } else if (!authToken && state.url === "/dashboard") {
      this.router.navigate(["/login"]);
      return false;
    } else {
      return true;

    }
  }
}
