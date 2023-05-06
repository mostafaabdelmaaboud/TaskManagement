import { Injectable, inject } from "@angular/core";
import { UsersModel } from "../../context/DTOs";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap, catchError, throwError } from "rxjs";
import { ListUsersService } from "../../services/list-users.service";
import { DeleteUser, GetAllUsers, UpdateUser } from "../actions/allUsers.actions";
export interface AllUsersModel {
  users: UsersModel[],
  tasksLoaded: Boolean,
  totalItems: number
}
export interface UpdateUserModel {
  updateUser: {
    massage: string | null,
    updateUserIsLoaded: boolean,
    isError: string | null
  }
}
export interface DeleteUserModel {
  deleteUser: {
    massage: string | null,
    DeleteUserIsLoaded: boolean,
    isError: string | null
  }

}
@State<AllUsersModel>({
  name: 'users',
  defaults: {
    users: [],
    tasksLoaded: false,
    totalItems: 0
  }
})
@State<UpdateUserModel>({
  name: 'updateUser',
  defaults: {
    updateUser: {
      massage: null,
      updateUserIsLoaded: false,
      isError: null
    }
  }
})
@State<DeleteUserModel>({
  name: 'DeleteUser',
  defaults: {
    deleteUser: {
      massage: null,
      DeleteUserIsLoaded: false,
      isError: null
    }
  }
})
@Injectable()
export class AllUsersState {
  usersData: any | null = null;

  @Selector()
  static allUsers(state: AllUsersModel) {
    return state.users;
  }
  @Selector()
  static totalItems(state: AllUsersModel) {
    return state.totalItems;
  }
  @Selector()
  static usersLoaded(state: AllUsersModel) {
    return state.tasksLoaded;
  }

  @Selector()
  static updateUserIsLoaded(state: UpdateUserModel) {
    return state.updateUser.updateUserIsLoaded;
  }
  @Selector()
  static massageUpdateUser(state: UpdateUserModel) {
    return state.updateUser.massage;
  }
  @Selector()
  static massageDeleteUser(state: DeleteUserModel) {
    return state.deleteUser.massage;
  }
  private usersService = inject(ListUsersService);

  constructor() { }
  @Action(GetAllUsers)
  getAllTasks({ patchState }: StateContext<AllUsersModel>, { payload }: GetAllUsers) {
    patchState({ tasksLoaded: true });
    // this.tasksData = payload;
    if (payload) {
      this.usersData = payload;
    } else if (this.usersData != null) {
      this.usersData = this.usersData
    } else {
      this.usersData = null
    }
    return this.usersService.getUsers(this.usersData).pipe(
      tap(res => {

        patchState({
          users: res.users,
          tasksLoaded: false,
          totalItems: res.totalItems
        })
      }),
      catchError(err => {
        patchState({
          users: [],
          tasksLoaded: false,
          totalItems: 0
        });
        return throwError(() => err);
      })
    )
  }
  @Action(UpdateUser)
  updateTask({ patchState, dispatch, getState }: StateContext<UpdateUserModel>, { payload }: UpdateUser) {
    debugger;
    patchState({
      updateUser: {
        ...getState().updateUser,
        updateUserIsLoaded: true
      }
    });
    return this.usersService.updateTask(payload).pipe(
      tap(res => {
        debugger;
        patchState({
          updateUser: {
            massage: res.massage,
            updateUserIsLoaded: false,
            isError: null
          }

        });
        dispatch(new GetAllUsers(this.usersData));
      }),
      catchError(err => {
        patchState({
          updateUser: {
            massage: null,
            updateUserIsLoaded: false,
            isError: err
          }
        });
        return throwError(() => err);
      })
    )
  }
  @Action(DeleteUser)
  deleteTask({ patchState, dispatch, getState }: StateContext<DeleteUserModel>, { id }: DeleteUser) {
    patchState({
      deleteUser: {
        ...getState().deleteUser,
        DeleteUserIsLoaded: true,
        massage: null

      }
    })
    return this.usersService.deleteUser(id).pipe(
      tap(res => {

        patchState({
          deleteUser: {
            massage: res.massage,
            DeleteUserIsLoaded: false,
            isError: null
          }

        });
        dispatch(new GetAllUsers(this.usersData));

      }),
      catchError(err => {

        patchState({
          deleteUser: {
            massage: null,
            DeleteUserIsLoaded: false,
            isError: err
          }

        })
        return throwError(() => err)
      })

    )
  }
}
