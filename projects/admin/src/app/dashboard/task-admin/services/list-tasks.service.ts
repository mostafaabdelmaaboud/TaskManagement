import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { AllTasksModel } from '../store/state/allTasks.state';
import { CreateTaskModel } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class ListTasksService {

  constructor(private http: HttpClient) { }
  getTasks(): Observable<AllTasksModel> {
    debugger;
    return this.http.get<AllTasksModel>(`${environment.baseApi}/tasks/all-tasks`);
  }
  addTask(mode: FormData) {
    debugger;
    return this.http.post(`${environment.baseApi}/tasks/add-task`, mode);
  }
}
