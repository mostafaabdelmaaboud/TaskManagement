import { catchError, throwError } from 'rxjs';
import { tap } from 'rxjs';
import { Injectable, inject } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddTask, DeleteTask, GetAllTasks } from "../actions/allTasks.actions";
import { ListTasksService } from "../../services/list-tasks.service";
import { AddTaskModel, UsersModel } from '../../context/DTOs';

export interface AllTasksModel {
  tasks: UsersModel[],
  tasksLoaded: Boolean,
  totalItems: number
}
export interface CreateTaskModel {
  addTask: {
    massage: string | null,
    createTaskIsLoaded: boolean,
    isError: string | null
  }
}
export interface DeleteTaskModel {
  deleteTask: {
    massage: string | null,
    DeleteTaskIsLoaded: boolean,
    isError: string | null
  }

}
@State<AllTasksModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    tasksLoaded: false,
    totalItems: 0
  }
})
@State<CreateTaskModel>({
  name: 'AddTask',
  defaults: {
    addTask: {
      massage: null,
      createTaskIsLoaded: false,
      isError: null
    }
  }
})
@State<DeleteTaskModel>({
  name: 'DeleteTask',
  defaults: {
    deleteTask: {
      massage: null,
      DeleteTaskIsLoaded: false,
      isError: null
    }
  }
})
@Injectable()
export class AllTasksState {
  @Selector()
  static allTasks(state: AllTasksModel) {
    return state.tasks;
  }
  @Selector()
  static tasksLoaded(state: AllTasksModel) {
    return state.tasksLoaded;
  }

  @Selector()
  static addTaskIsLoaded(state: CreateTaskModel) {
    return state.addTask.createTaskIsLoaded;
  }
  @Selector()
  static massageCreateTaks(state: CreateTaskModel) {
    return state.addTask.massage;
  }
  @Selector()
  static massageDeleteTaks(state: DeleteTaskModel) {
    return state.deleteTask.massage;
  }
  private tasksService = inject(ListTasksService);
  constructor() { }
  @Action(GetAllTasks)
  getAllTasks({ patchState }: StateContext<AllTasksModel>) {
    debugger;
    patchState({ tasksLoaded: true })
    return this.tasksService.getTasks().pipe(
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
  @Action(AddTask)
  addTask({ patchState, dispatch, getState }: StateContext<CreateTaskModel>, { payload }: AddTask) {
    console.log("payload", payload);
    patchState({
      addTask: {
        ...getState().addTask,
        createTaskIsLoaded: true
      }
    });
    return this.tasksService.addTask(payload).pipe(
      tap(res => {

        patchState({
          addTask: {
            massage: res.massage,
            createTaskIsLoaded: false,
            isError: null
          }

        });
        dispatch(new GetAllTasks());
      }),
      catchError(err => {
        patchState({
          addTask: {
            massage: null,
            createTaskIsLoaded: false,
            isError: err
          }
        });
        return throwError(() => err);
      })
    )
  }
  @Action(DeleteTask)
  deleteTask({ patchState, dispatch, getState }: StateContext<DeleteTaskModel>, { id }: DeleteTask) {
    patchState({
      deleteTask: {
        ...getState().deleteTask,
        DeleteTaskIsLoaded: true,
        massage: null

      }
    })
    return this.tasksService.deleteTask(id).pipe(
      tap(res => {

        patchState({
          deleteTask: {
            massage: res.massage,
            DeleteTaskIsLoaded: false,
            isError: null
          }

        });
        dispatch(new GetAllTasks());

      }),
      catchError(err => {

        patchState({
          deleteTask: {
            massage: null,
            DeleteTaskIsLoaded: false,
            isError: err
          }

        })
        return throwError(() => err)
      })

    )
  }

}
