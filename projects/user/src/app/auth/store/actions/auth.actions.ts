import { IntLogin, IntRegister } from "../../context/DTOs";

export interface AuthStateModel {
  token: string | null;
  userId: string | null;
  isLoading: boolean,
  isSuccess: boolean,
  isError: string | null;
}
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: IntLogin) { }
}


export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: IntRegister) { }
}
export class Logout {
  static readonly type = '[Auth] Logout'
}
