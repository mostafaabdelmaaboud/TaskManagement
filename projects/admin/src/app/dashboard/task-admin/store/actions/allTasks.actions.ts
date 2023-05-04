import { state } from "@angular/animations"
import { AddTaskModel } from "../../context/DTOs"

export class GetAllTasks {
  static readonly type = "[Tasks] Get All Tasks";
}
export class AddTask {
  static readonly type = "[Tasks] Add Task";
  constructor(public payload: FormData) {

  }
}
export class DeleteTask {
  static readonly type = "[Tasks] Delete Task";
  constructor(public id: string) {

  }
}
