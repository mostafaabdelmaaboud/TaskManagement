import { state } from "@angular/animations"
import { AddTaskModel, Filteration } from "../../context/DTOs"

export class GetAllTasks {
  static readonly type = "[Tasks] Get All Tasks";
  constructor(public payload: Filteration | null) { }

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
export class UpdateTask {
  static readonly type = "[Tasks] Update Task";
  constructor(public payload: FormData, public id: string) {

  }
}
