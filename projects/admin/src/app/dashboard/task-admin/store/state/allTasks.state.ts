import { catchError, throwError } from 'rxjs';
import { tap } from 'rxjs';
import { Injectable, inject } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddTask, GetAllTasks } from "../actions/allTasks.actions";
import { ListTasksService } from "../../services/list-tasks.service";
import { CreateTaskModel, UsersModel } from '../../context/DTOs';

export interface AllTasksModel {
  tasks: UsersModel[],
  tasksLoaded: Boolean,
  totalItems: number
}
export interface CreateTask {
  massage: string | null,
  createTaskIsLoaded: boolean,
  isError: string | null
}
@State<AllTasksModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    tasksLoaded: false,
    totalItems: 0
  }
})
@State<CreateTask>({
  name: 'AddTask',
  defaults: {
    massage: null,
    createTaskIsLoaded: false,
    isError: null
  }
})
@Injectable()
export class AllTasksState {
  @Selector()
  static allTasks(state: AllTasksModel) {
    return state.tasks;
  }
  @Selector()
  static addTaskIsLoaded(state: CreateTask) {
    return state.createTaskIsLoaded;
  }
  @Selector()
  static massageCeareTaks(state: CreateTask) {
    return state.massage;
  }

  private tasksService = inject(ListTasksService);

  constructor() {

  }
  @Action(GetAllTasks)
  getAllTasks({ patchState }: StateContext<AllTasksModel>) {
    patchState({ tasksLoaded: true })
    return this.tasksService.getTasks().pipe(
      tap(res => {
        patchState({
          tasks: res.tasks,
          tasksLoaded: false,
          totalItems: res.totalItems
        })
      }),
      catchError(err => {
        patchState({
          tasks: [],
          tasksLoaded: false,
          totalItems: 0
        });
        return throwError(() => err);
      })
    )
  }
  @Action(AddTask)
  addTask({ patchState, dispatch }: StateContext<CreateTask>, { payload }: AddTask) {
    console.log("payload", payload);
    patchState({ createTaskIsLoaded: true });
    return this.tasksService.addTask(payload).pipe(
      tap(res => {

        patchState({
          massage: res.massage,
          createTaskIsLoaded: false,
          isError: null
        });
        dispatch(new GetAllTasks());
      }),
      catchError(err => {
        patchState({
          massage: null,
          createTaskIsLoaded: false,
          isError: err
        });
        return throwError(() => err);
      })
    )
  }
}
