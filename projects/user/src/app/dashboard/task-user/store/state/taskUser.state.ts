import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tasksModel } from "../../context/DTOs";
import { TaskUserService } from '../../services/task-user.service';
import { CompleteTask, GetTaskUser, GetUserDetails } from "../actions/taskUser.actions";
import { catchError, tap, throwError } from 'rxjs';
export interface AllTasksModel {
  tasks: tasksModel[];
  tasksLoaded: boolean;
}
export interface TaskCompleteModel {
  completeTask: {
    massage: string | null;
    completeTaskIsLoaded: boolean;
    isError: string | null;
  }
}
export interface TaksDetailsModel {
  taskDetails: tasksModel | null;
  taskDetailsLoaded: boolean;
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
@State<TaksDetailsModel>({
  name: "TaskDetails",
  defaults: {
    taskDetails: null,
    taskDetailsLoaded: false
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
  @Selector()
  static taskDetailsLoaded(state: TaksDetailsModel) {
    return state.taskDetailsLoaded;
  }
  @Selector()
  static taskDetails(state: TaksDetailsModel) {
    return state.taskDetails;
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
  @Action(GetUserDetails)
  getUserDetails({ patchState }: StateContext<TaksDetailsModel>, { id }: GetUserDetails) {
    return this.taskUserService.getUserDetails(id).pipe(
      tap((res) => {
        patchState({
          taskDetails: res.tasks,
          taskDetailsLoaded: true
        })
      }),
      catchError(err => {
        patchState({
          taskDetails: null,
          taskDetailsLoaded: true
        })
        return throwError(() => err);
      })
    )
  }
}
