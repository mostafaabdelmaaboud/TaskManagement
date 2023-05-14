import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetTasksDetailsModel, filterTasksModel } from '../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';
import { AllTasksModel, TaskCompleteModel } from '../store/state/taskUser.state';

@Injectable({
  providedIn: 'root'
})
export class TaskUserService {
  private http = inject(HttpClient);
  constructor() { }
  getTaskUser(mode: filterTasksModel, id: string): Observable<AllTasksModel> {
    let params = new HttpParams();
    if (mode) {
      Object.entries(mode).forEach(([key, value]: any) => {
        params = params.set(key, value);
      })
    }
    return this.http.get<AllTasksModel>(`${environment.baseApi}/tasks/user-tasks/${id}`, { params });
  }
  complete(id: string) {
    return this.http.put<TaskCompleteModel['completeTask']>(`${environment.baseApi}/tasks/complete/`, { id: id });
  }
  getUserDetails(id: string): Observable<GetTasksDetailsModel> {
    return this.http.get<GetTasksDetailsModel>(`${environment.baseApi}/tasks/task/${id}`);
  }

}
