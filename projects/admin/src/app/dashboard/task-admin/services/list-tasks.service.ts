import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { AllTasksModel, CreateTask } from '../store/state/allTasks.state';
import { CreateTaskModel, UsersModel } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class ListTasksService {
  constructor(private http: HttpClient) { }
  getTasks(): Observable<AllTasksModel> {
    return this.http.get<AllTasksModel>(`${environment.baseApi}/tasks/all-tasks`);
  }
  addTask(mode: FormData): Observable<CreateTask> {
    return this.http.post<CreateTask>(`${environment.baseApi}/tasks/add-task`, mode);
  }
}
