import { state } from "@angular/animations"
import { CreateTaskModel } from "../../context/DTOs"

export class GetAllTasks {
  static readonly type = "[Tasks] Get All Tasks";
}
export class AddTask {
  static readonly type = "[Tasks] Add Task";
  constructor(public payload: FormData) {

  }
}
