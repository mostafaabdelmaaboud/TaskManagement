import { filterTasksModel } from "../../context/DTOs";

export class GetTaskUser {
  static readonly type = "[TaskUser] Get All";
  constructor(public payload: filterTasksModel, public id: string) {

  }
}

export class CompleteTask {
  static readonly type = "[TaskUser] Complete Task";
  constructor(public payload: filterTasksModel, public taskId: string, public userId: string) {
  }
}
export class GetUserDetails {
  static readonly type = "[TaskUser] Get User Details";
  constructor(public id: string) { }

}
