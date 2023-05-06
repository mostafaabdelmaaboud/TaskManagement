import { catchError, throwError } from 'rxjs';
import { tap } from 'rxjs';
import { Injectable, inject } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddTask, DeleteTask, GetAllTasks, UpdateTask } from "../actions/allTasks.actions";
import { ListTasksService } from "../../services/list-tasks.service";
<<<<<<< HEAD
import { AddTaskModel, Filteration, UsersModel } from '../../context/DTOs';
=======
import { AddTaskModel, UsersModel } from '../../context/DTOs';
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd

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
<<<<<<< HEAD
  tasksData: Filteration | null = null;
=======
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
  @Selector()
  static allTasks(state: AllTasksModel) {
    return state.tasks;
  }
  @Selector()
<<<<<<< HEAD
  static totalItems(state: AllTasksModel) {
    return state.totalItems;
  }
  @Selector()
=======
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
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
<<<<<<< HEAD
  getAllTasks({ patchState }: StateContext<AllTasksModel>, { payload }: GetAllTasks) {
    patchState({ tasksLoaded: true });
    // this.tasksData = payload;
    if (payload) {
      this.tasksData = payload;
    } else if (this.tasksData != null) {
      this.tasksData = this.tasksData
    } else {
      this.tasksData = null
    }
    return this.tasksService.getTasks(this.tasksData).pipe(
=======
  getAllTasks({ patchState }: StateContext<AllTasksModel>) {
    patchState({ tasksLoaded: true })
    return this.tasksService.getTasks().pipe(
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
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
<<<<<<< HEAD
        dispatch(new GetAllTasks(this.tasksData));
=======
        dispatch(new GetAllTasks());
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
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
<<<<<<< HEAD
        dispatch(new GetAllTasks(this.tasksData));
=======
        dispatch(new GetAllTasks());
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
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
<<<<<<< HEAD
        dispatch(new GetAllTasks(this.tasksData));
=======
        dispatch(new GetAllTasks());
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd

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
