import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthStateModel, Login, Logout } from "../actions/login.actions";
import { Injectable } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { catchError, of, tap } from "rxjs";
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
  constructor(private authService: LoginService) { }

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, action: Login) {
    debugger;
    patchState({ isLoading: true })
    return this.authService.login(action.payload).pipe(
      tap(res => {
        debugger;
        patchState({
          token: res.token,
          userId: res.userId,
          isLoading: false,
          isSuccess: true,
          isError: null
        })
      }),
      catchError(err => {
        debugger;
        if (err instanceof HttpErrorResponse) {
          patchState({
            isLoading: false,
            isSuccess: false,
            isError: err.error.message
          });
        }
        console.log("err", err);

        return of("")
      })
    );
  }
  @Action(Logout)
  logout({ patchState }: StateContext<AuthStateModel>) {
    // patchState({
    //   token: null,
    //   userId: null
    // })
  }
}
