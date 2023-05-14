import { Component, OnInit, inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { CompleteTask, GetUserDetails } from '../../store/actions/taskUser.actions';
import { TasksUser } from '../../store/state/taskUser.state';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { tasksModel } from '../../context/DTOs';

import { ListTasksComponent } from '../list-tasks/list-tasks.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent extends ListTasksComponent implements OnInit {
  private activateRouter = inject(ActivatedRoute);
  taskDetails!: tasksModel;
  @Select(TasksUser.taskDetailsLoaded) taskDetailsLoaded$!: Observable<boolean>
  @Select(TasksUser.taskDetails) taskDetails$!: Observable<tasksModel>;
  taskId!: string;
  override isLoading = true;
  constructor() {
    super()
  }
  override ngOnInit(): void {
    this.taskId = this.activateRouter.snapshot.paramMap.get("id") as string;
    this.taskDetails$.subscribe(taskDetails => {
      console.log("taskDetails", taskDetails);
      this.taskDetails = taskDetails;
    })
    this.taskDetailsLoaded$.subscribe(DetailsLoaded => {
      if (!DetailsLoaded) {
        this.store.dispatch(new GetUserDetails(this.taskId)).subscribe({
          next: (response) => {
            this.isLoading = false;
          },
          error: (error) => {
            this.router.navigate(["../"]);
          }
        })
      } else {
        this.isLoading = false;
      }
    })
  }

  override complete() {
    debugger;
    super.initialTasks(false);
    debugger;
    if (this.taskId) {
      debugger;
      this.store.dispatch(new CompleteTask(this.filteration, this.taskId, this.userData.userId)).subscribe(res => {
        this.toastr.success(res?.UserTasks.massage || "Task Complete Successfully", 'Success', {
          timeOut: 2000
        });
        this.router.navigate(["../"]);
      });
    }
  }
}
