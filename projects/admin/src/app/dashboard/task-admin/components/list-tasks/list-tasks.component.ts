import { Component, OnInit, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AllTasksState } from '../../store/state/allTasks.state';
import { Observable } from 'rxjs';
import { GetAllTasks } from '../../store/actions/allTasks.actions';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ListUsersModel, UsersModel } from '../../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';




@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user', 'deadline', 'status', 'actions'];
  dataSource: UsersModel[] = [];
  linkServer = environment.baseApi;
  isLoading = true;
  @Select(AllTasksState.allTasks) allTasks$!: Observable<any[]>;
  private store = inject(Store);
  public dialog = inject(MatDialog)
  constructor() { }

  ngOnInit(): void {
    this.allTasks$.subscribe((res: UsersModel[]) => {
      console.log(res, res);
      if (res.length) {
        this.dataSource = this.mappingTasks(res);

      }
    });
    if (!this.dataSource.length) {
      this.store.dispatch(new GetAllTasks()).subscribe(res => {
        this.isLoading = false;

      },
        err => {
          this.isLoading = false;

        });

    }
  }
  mappingTasks(data: UsersModel[]): UsersModel[] {
    let newTasks: UsersModel[] = data.map(item => {
      return {
        ...item,
        user: item.userId.username
      }
    });
    return newTasks
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "40vw"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
