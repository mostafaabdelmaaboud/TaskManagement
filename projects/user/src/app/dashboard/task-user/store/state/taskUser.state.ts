import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tasksModel } from "../../context/DTOs";
import { TaskUserService } from '../../services/task-user.service';
import { GetTaskUser } from "../actions/taskUser.actions";
import { catchError, tap, throwError } from 'rxjs';
export interface AllTasksModel {
  tasks: tasksModel[],
  tasksLoaded: boolean
}
@State<AllTasksModel>({
  name: "UserTasks",
  defaults: {
    tasks: [],
    tasksLoaded: false
  }
})
@Injectable()

export class TasksUser {
  private taskUserService = inject(TaskUserService);
  @Selector()
  static tasksLoaded(state: AllTasksModel) {
    return state.tasksLoaded;
  }
  @Selector()
  static tasks(state: AllTasksModel) {
    return state.tasks;
  }
  constructor() { }
  @Action(GetTaskUser)
  getTasksUser({ patchState }: StateContext<AllTasksModel>, { payload, id }: GetTaskUser) {
    return this.taskUserService.getTaskUser(payload, id).pipe(
      tap(res => {
        debugger;
        patchState({
          tasks: res.tasks,
          tasksLoaded: true
        })
      }),
      catchError(err => {
        patchState({
          tasks: [],
          tasksLoaded: false
        })
        return throwError(() => err)
      })
    )
  }

}
