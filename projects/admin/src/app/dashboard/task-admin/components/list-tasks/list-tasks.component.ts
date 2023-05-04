import { Component, OnInit, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AllTasksState } from '../../store/state/allTasks.state';
import { Observable } from 'rxjs';
import { DeleteTask, GetAllTasks } from '../../store/actions/allTasks.actions';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ListUsersModel, UsersModel } from '../../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';
import { HandleErrorService } from 'projects/admin/src/app/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';




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
  loading: any = {};
  @Select(AllTasksState.allTasks) allTasks$!: Observable<any[]>;
  @Select(AllTasksState.massageDeleteTaks) massageDeleteTaks$!: Observable<string | null>;
  @Select(AllTasksState.tasksLoaded) tasksLoaded$!: Observable<boolean>;
  private store = inject(Store);
  public dialog = inject(MatDialog);
  private error = inject(HandleErrorService);
  private toastr = inject(ToastrService);
  users: any = [
    { name: "Mohamed", id: "6452a0749bdca9984acf10f8" },
    { name: "islam", id: "6452a6e09bdca9984acf111a" },
    { name: "Ahmed", id: "6452a0e79bdca9984acf10fe" },
    { name: "Mostafa", id: "6452a1049bdca9984acf1101" },
    { name: "shosho", id: "6452b8d3bd7e7eb41913875f" }
  ]
  constructor() { }

  ngOnInit(): void {
    this.allTasks$.subscribe((res: UsersModel[]) => {
      console.log(res, res);
      this.dataSource = this.mappingTasks(res);
    });
    this.massageDeleteTaks$.subscribe(res => {
      if (res != null) {
        this.toastr.success("Task Is Deleted", 'Success', {
          timeOut: 2000
        });
      }
    })
    this.store.dispatch(new GetAllTasks()).subscribe({
      next: res => {
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
      }
    });
  }
  deleteRow(id: string) {
    let objIndex = this.dataSource.findIndex((obj => obj._id === id));
    let conf = confirm("Want to delete?");
    if (conf) {
      this.dataSource[objIndex].loading = true;
      this.store.dispatch(new DeleteTask(id)).subscribe({
        next: data => {
          this.dataSource[objIndex].loading = false;
        },
        error: err => {
          this.dataSource[objIndex].loading = false;
        },
      })

      //Logic to delete the item
    }

  }
  mappingTasks(data: UsersModel[]): UsersModel[] {
    let newTasks: UsersModel[] = data.map(item => {
      return {
        ...item,
        loading: false,
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
    });
  }
  updateRow(element: UsersModel) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "40vw",
      data: element
    });
  }
}
