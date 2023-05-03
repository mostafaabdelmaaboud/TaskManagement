import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthStateModel, Login, Logout } from "../actions/login.actions";
import { Injectable } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { catchError, of, tap, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    userId: null,
    isSuccess: false,
    isError: null,
    isLoading: false
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel) { return state.token; }
  @Selector()
  static getAuthLogin(State: AuthStateModel) {
    return State.token;
  }
  @Selector()
  static loginIsSuccess(State: AuthStateModel) {
    return State.isSuccess;
  }
  @Selector()
  static loginIsError(State: AuthStateModel) {
    return State.isError;
  }
  @Selector()
  static loginIsLoading(State: AuthStateModel) {
    return State.isLoading;
  }
  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {

    return !!state.token;
  }
  constructor(private authService: LoginService) { }

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, action: Login) {
    patchState({ isLoading: true })
    return this.authService.login(action.payload).pipe(
      tap(res => {
        patchState({
          token: res.token,
          userId: res.userId,
          isLoading: false,
          isSuccess: true,
          isError: null
        });
      }),
      catchError(err => {

        patchState({
          isLoading: false,
          isSuccess: false,
          isError: err
        });
        return throwError(() => err);

      })
    );
  }
  @Action(Logout)
  logout({ patchState }: StateContext<AuthStateModel>) {
    localStorage.removeItem("token");
    patchState({
      token: null,
      userId: null,
      isSuccess: false,
      isError: null,
      isLoading: false
    })
  }
}
