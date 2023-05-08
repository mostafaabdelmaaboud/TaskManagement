import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { filterTasksModel } from '../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';
import { AllTasksModel } from '../store/state/taskUser.state';

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
    debugger;
    return this.http.get<AllTasksModel>(`${environment.baseApi}/tasks/user-tasks/${id}`, { params });
  }
}
