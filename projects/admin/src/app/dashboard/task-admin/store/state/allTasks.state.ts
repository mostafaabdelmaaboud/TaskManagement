import { catchError, throwError } from 'rxjs';
import { tap } from 'rxjs';
import { Injectable, inject } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetAllTasks } from "../actions/allTasks.actions";
import { ListTasksService } from "../../services/list-tasks.service";

export interface AllTasksModel {
  tasks: any[],
  tasksLoaded: Boolean,
  totalItems: number
}
@State<AllTasksModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    tasksLoaded: false,
    totalItems: 0
  }
})
@Injectable()
export class AllTasksState {
  @Selector()
  static allTasks(state: AllTasksModel) {
    return state.tasks;
  }
  private listTasksService = inject(ListTasksService);
  constructor() {

  }
  @Action(GetAllTasks)
  getAllTasks({ patchState }: StateContext<AllTasksModel>) {
    debugger;
    patchState({ tasksLoaded: true })
    return this.listTasksService.getTasks().pipe(
      tap(res => {
        debugger;
        patchState({
          tasks: res.tasks,
          tasksLoaded: false,
          totalItems: res.totalItems
        })
      }),
      catchError(err => {
        debugger;
        patchState({
          tasks: [],
          tasksLoaded: false,
          totalItems: 0
        });
        return throwError(() => err);
      })
    )
  }
}
