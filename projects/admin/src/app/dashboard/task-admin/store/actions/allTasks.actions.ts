import { state } from "@angular/animations"
<<<<<<< HEAD
import { AddTaskModel, Filteration } from "../../context/DTOs"

export class GetAllTasks {
  static readonly type = "[Tasks] Get All Tasks";
  constructor(public payload: Filteration | null) { }
=======
import { AddTaskModel } from "../../context/DTOs"

export class GetAllTasks {
  static readonly type = "[Tasks] Get All Tasks";
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
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
