import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tasksModel } from "../../context/DTOs";
import { TaskUserService } from '../../services/task-user.service';
import { CompleteTask, GetTaskUser } from "../actions/taskUser.actions";
import { catchError, tap, throwError } from 'rxjs';
export interface AllTasksModel {
  tasks: tasksModel[],
  tasksLoaded: boolean
}
export interface TaskCompleteModel {
  completeTask: {
    massage: string | null,
    completeTaskIsLoaded: boolean,
    isError: string | null
  }
}
@State<AllTasksModel>({
  name: "UserTasks",
  defaults: {
    tasks: [],
    tasksLoaded: false
  }
})
@State<TaskCompleteModel>({
  name: "completeTask",
  defaults: {
    completeTask: {
      massage: null,
      completeTaskIsLoaded: false,
      isError: null
    }
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
  @Action(CompleteTask)
  completeTask({ patchState, dispatch }: StateContext<TaskCompleteModel>, { payload, taskId, userId }: CompleteTask) {
    return this.taskUserService.complete(taskId).pipe(tap(res => {
      patchState({
        completeTask: {
          massage: res.massage,
          completeTaskIsLoaded: true,
          isError: null
        }
      })
    }),
      catchError(err => {
        patchState({
          completeTask: {
            massage: null,
            completeTaskIsLoaded: false,
            isError: err
          }
        })
        return throwError(() => err)
      }))
  }

}
