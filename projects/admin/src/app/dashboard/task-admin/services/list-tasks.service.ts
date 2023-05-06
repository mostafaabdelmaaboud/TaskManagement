import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { AllTasksModel, CreateTaskModel, DeleteTaskModel } from '../store/state/allTasks.state';

@Injectable({
  providedIn: 'root'
})
export class ListTasksService {
  constructor(private http: HttpClient) { }
<<<<<<< HEAD
  getTasks(filter: any): Observable<AllTasksModel> {
    let queryParams = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        queryParams = queryParams.set(key, value);
      })
    }
=======
  getTasks(): Observable<AllTasksModel> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", 1);
    queryParams = queryParams.append("limit", 10);

>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
    return this.http.get<AllTasksModel>(`${environment.baseApi}/tasks/all-tasks`, { params: queryParams });
  }
  addTask(mode: FormData): Observable<CreateTaskModel["addTask"]> {
    return this.http.post<CreateTaskModel["addTask"]>(`${environment.baseApi}/tasks/add-task`, mode);
  }
  deleteTask(id: string): Observable<DeleteTaskModel["deleteTask"]> {
    return this.http.delete<DeleteTaskModel["deleteTask"]>(`${environment.baseApi}/tasks/delete-task/${id}`);
  }
  updateTask(mode: FormData, id: string): Observable<CreateTaskModel["addTask"]> {

    return this.http.put<CreateTaskModel["addTask"]>(`${environment.baseApi}/tasks/edit-task/${id}`, mode);

  }
}