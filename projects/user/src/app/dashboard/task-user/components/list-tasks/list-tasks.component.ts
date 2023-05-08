import { Component, OnInit, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetTaskUser } from '../../store/actions/taskUser.actions';
import { UserData, filterTasksModel, tasksModel } from '../../context/DTOs';
import { TasksUser } from '../../store/state/taskUser.state';
import { Observable } from 'rxjs';
import { environment } from 'projects/admin/src/environments/environment';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  @Select(TasksUser.tasksLoaded) tasksLoaded$!: Observable<boolean>
  @Select(TasksUser.tasks) tasks$!: Observable<tasksModel[]>
  baseApi = environment.baseApi;
  userData!: UserData;
  tasksData!: tasksModel[];
  private store = inject(Store);
  isLoading = false;
  totalItems: number = 0;
  filteration: filterTasksModel = {
    page: 1,
    limit: 10,
    status: "In-Progress"
  };
  constructor() { }

  ngOnInit(): void {
    debugger;
    let token = JSON.stringify(localStorage.getItem("token"));
    if (token) {
      this.userData = JSON.parse(window.atob(token.split(".")[1]));
      this.getTasks(this.filteration, this.userData.userId, null);
    }
    this.tasks$.subscribe(res => {
      debugger;

      this.tasksData = res.map(item => {
        return { ...item, isLoading: false }
      });
    })
  }
  getTasks(filter: filterTasksModel, id: string, page: number | null) {
    debugger;
    if (page == null) {
      this.tasksLoaded$.subscribe(tasksLoaded => {
        if (!tasksLoaded) {
          this.isLoading = true;
          this.store.dispatch(new GetTaskUser(filter, id)).subscribe(res => {
            this.totalItems = res.UserTasks.tasks.length
            this.isLoading = false;
          });
        }
      })
    } else {
      filter.page = page;
      this.store.dispatch(new GetTaskUser(filter, id)).subscribe(res => {
        debugger;

        this.filteration.page = page;

      });
    }
  }
  identify(index: any, item: any) {
    return item._id;
  }
  changePage(even: number) {
    debugger;
    this.filteration.page = even;
    this.getTasks(this.filteration, this.userData.userId, even)

  }
  complete(taskItem: tasksModel) {
    debugger;
    let index = this.tasksData.findIndex(item => item._id === taskItem._id);
    this.tasksData[index].isLoading = true;

  }
}
