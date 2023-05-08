import { filterTasksModel } from "../../context/DTOs";

export class GetTaskUser {
  static readonly type = "[TaskUser] Get All";
  constructor(public payload: filterTasksModel, public id: string) {

  }
}
