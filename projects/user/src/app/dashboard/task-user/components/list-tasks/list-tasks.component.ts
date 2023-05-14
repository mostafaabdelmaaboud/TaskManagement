import { Component, OnInit, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CompleteTask, GetTaskUser, GetUserDetails } from '../../store/actions/taskUser.actions';
import { UserData, filterTasksModel, tasksModel } from '../../context/DTOs';
import { TasksUser } from '../../store/state/taskUser.state';
import { Observable } from 'rxjs';
import { environment } from 'projects/admin/src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  @Select(TasksUser.tasksLoaded) tasksLoaded$!: Observable<boolean>
  @Select(TasksUser.tasks) tasks$!: Observable<tasksModel[]>
  protected toastr = inject(ToastrService);
  protected router = inject(Router);
  public translate = inject(TranslateService);

  baseApi = environment.baseApi;
  userData!: UserData;
  tasksData!: tasksModel[];
  protected store = inject(Store);
  isLoading = false;
  totalItems: number = 0;
  storageTotalItems: number = 0;
  filteration: filterTasksModel = {
    page: 1,
    status: "In-Progress"
  };
  constructor() { }

  ngOnInit(): void {
    this.initialTasks(true);
    this.tasks$.subscribe(res => {
      this.totalItems = res.length
      this.storageTotalItems = res.length;
      this.tasksData = res.map(item => {
        return { ...item, isLoading: false }
      });
    })
  }
  initialTasks(loadTask: boolean) {
    debugger;

    let token = JSON.stringify(localStorage.getItem("token"));
    if (token) {
      this.userData = JSON.parse(window.atob(token.split(".")[1]));
      if (loadTask) {
        this.getTasks(this.filteration, this.userData.userId, null);

      }
    }
  }
  getTasks(filter: filterTasksModel, id: string, page: number | null) {
    if (page == null) {
      this.tasksLoaded$.subscribe(tasksLoaded => {
        if (!tasksLoaded) {
          this.isLoading = true;
          this.store.dispatch(new GetTaskUser(filter, id)).subscribe({
            next: res => {
              // this.totalItems = res.UserTasks.tasks.length
              this.isLoading = false;
            },
            error: err => {
              this.isLoading = false;

            }
          });
        } else {
          this.store.dispatch(new GetTaskUser(filter, id)).subscribe({
            next: res => {
              // this.totalItems = res.UserTasks.tasks.length
              this.isLoading = false;
            },
            error: err => {
              this.isLoading = false;

            }
          });
        }
      })
    } else {
      filter.page = page;
      this.store.dispatch(new GetTaskUser(filter, id)).subscribe(res => {
        this.filteration.page = page;
      });
    }
  }
  identify(index: any, item: any) {
    return item._id;
  }
  changePage(even: number) {
    this.filteration.page = even;
  }
  complete(taskItem: tasksModel) {
    let index = this.tasksData.findIndex(item => item._id === taskItem._id);
    this.tasksData[index].isLoading = true;
    this.store.dispatch(new CompleteTask(this.filteration, taskItem._id, this.userData.userId)).subscribe(res => {
      this.tasksData.splice(index, 1);
      this.totalItems = this.totalItems - 1;
      let cielNumberDecimal = Math.ceil(this.totalItems / 8);
      let ceilStorageTotalItems = Math.ceil(this.storageTotalItems / 8);
      if (cielNumberDecimal < ceilStorageTotalItems) {
        this.storageTotalItems = this.storageTotalItems - 8;
        this.filteration.page = this.filteration.page - 1;
      }
      this.toastr.success(res?.UserTasks.massage || "Task Complete Successfully", 'Success', {
        timeOut: 2000
      });
    });
  }
  getUserDetails(id: string) {
    let index = this.tasksData.findIndex(item => item._id === id);
    this.tasksData[index].isLoading = true;
    this.store.dispatch(new GetUserDetails(id)).subscribe({
      next: (response) => {
        // treat recieved data
        this.router.navigate(["/dashboard/" + id]);
      },
      error: (error) => {
        // treat error
        this.tasksData[index].isLoading = false;

      }
    })
  }
}
