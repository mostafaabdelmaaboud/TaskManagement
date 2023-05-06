import { UpdateUserByIdModel } from "../../context/DTOs";

export class GetAllUsers {
  static readonly type = "[Users] Get All Users";
  constructor(public payload: any | null) { }
}

export class DeleteUser {
  static readonly type = "[Users] Delete User";
  constructor(public id: string) {
  }
}
export class UpdateUser {
  static readonly type = "[Tasks] Update User";
  constructor(public payload: UpdateUserByIdModel) {

  }
}
