import { AllTasksModel } from './../../task-admin/store/state/allTasks.state';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';
import { AllUsersModel, DeleteUserModel, UpdateUserModel } from '../store/state/allUsers.state';
import { UpdateUserByIdModel } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {
  constructor(private http: HttpClient) { }
  getUsers(filter: any): Observable<AllUsersModel> {
    let queryParams = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        queryParams = queryParams.set(key, value);
      })
    }
    return this.http.get<AllUsersModel>(`${environment.baseApi}/auth/users`, { params: queryParams });
  }

  deleteUser(id: string): Observable<DeleteUserModel["deleteUser"]> {
    return this.http.delete<DeleteUserModel["deleteUser"]>(`${environment.baseApi}/auth/user/${id}`);
  }
  updateTask(mode: UpdateUserByIdModel): Observable<UpdateUserModel["updateUser"]> {

    return this.http.put<UpdateUserModel["updateUser"]>(`${environment.baseApi}/auth/user-status/`, mode);

  }
}
