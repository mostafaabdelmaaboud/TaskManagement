import { catchError, throwError } from 'rxjs';
import { tap } from 'rxjs';
import { Injectable, inject } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddTask, DeleteTask, GetAllTasks, UpdateTask } from "../actions/allTasks.actions";
import { ListTasksService } from "../../services/list-tasks.service";
import { AddTaskModel, Filteration, UsersModel } from '../../context/DTOs';

export interface AllTasksModel {
  tasks: UsersModel[],
  tasksLoaded: boolean,
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
  tasksData: Filteration | null = null;
  @Selector()
  static allTasks(state: AllTasksModel) {
    return state.tasks;
  }
  @Selector()
  static totalItems(state: AllTasksModel) {
    return state.totalItems;
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
  getAllTasks({ patchState }: StateContext<AllTasksModel>, { payload }: GetAllTasks) {

    // this.tasksData = payload;
    if (payload) {
      this.tasksData = payload;
    } else if (this.tasksData != null) {
      this.tasksData = this.tasksData
    } else {
      this.tasksData = null
    }
    return this.tasksService.getTasks(this.tasksData).pipe(
      tap(res => {
        debugger;
        patchState({
          tasks: res.tasks,
          tasksLoaded: true,
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
        dispatch(new GetAllTasks(this.tasksData));
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
  @Action(UpdateTask)
  updateTask({ patchState, dispatch, getState }: StateContext<CreateTaskModel>, { payload, id }: UpdateTask) {
    patchState({
      addTask: {
        ...getState().addTask,
        createTaskIsLoaded: true
      }
    });
    return this.tasksService.updateTask(payload, id).pipe(
      tap(res => {
        patchState({
          addTask: {
            massage: res.massage,
            createTaskIsLoaded: false,
            isError: null
          }

        });
        dispatch(new GetAllTasks(this.tasksData));
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
    debugger;
    patchState({
      deleteTask: {
        ...getState().deleteTask,

        DeleteTaskIsLoaded: true

      }
    })
    return this.tasksService.deleteTask(id).pipe(
      tap(res => {
        debugger;

        patchState({
          deleteTask: {
            massage: res.massage,
            DeleteTaskIsLoaded: false,
            isError: null
          }

        });
        debugger;
        dispatch(new GetAllTasks(this.tasksData));

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
