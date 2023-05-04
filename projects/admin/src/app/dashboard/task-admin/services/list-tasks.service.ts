import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { AllTasksModel, CreateTaskModel, DeleteTaskModel } from '../store/state/allTasks.state';

@Injectable({
  providedIn: 'root'
})
export class ListTasksService {
  constructor(private http: HttpClient) { }
  getTasks(): Observable<AllTasksModel> {
    return this.http.get<AllTasksModel>(`${environment.baseApi}/tasks/all-tasks`);
  }
  addTask(mode: FormData): Observable<CreateTaskModel["addTask"]> {
    return this.http.post<CreateTaskModel["addTask"]>(`${environment.baseApi}/tasks/add-task`, mode);
  }
  deleteTask(id: string): Observable<DeleteTaskModel["deleteTask"]> {
    return this.http.delete<DeleteTaskModel["deleteTask"]>(`${environment.baseApi}/tasks/delete-task/${id}`);
  }

}
