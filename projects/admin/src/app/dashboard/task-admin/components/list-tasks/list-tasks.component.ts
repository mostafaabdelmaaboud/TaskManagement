import { Component, OnInit, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AllTasksState } from '../../store/state/allTasks.state';
import { Observable } from 'rxjs';
import { GetAllTasks } from '../../store/actions/allTasks.actions';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';


export interface PeriodicElement {
  title: string;
  position: number;
  user: string;
  deadLineData: string;
  status: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, title: 'Hydrogen', user: 'Hydrogen', deadLineData: '2023-11-4', status: "fun", actions: 'H' },
  { position: 2, title: 'Helium', user: 'Hydrogen', deadLineData: '2023-11-4', status: "fun", actions: 'He' },
  { position: 3, title: 'Lithium', user: 'Hydrogen', deadLineData: '2023-11-4', status: "fun", actions: 'Li' },
  { position: 4, title: 'Beryllium', user: 'Hydrogen', deadLineData: '2023-11-4', status: "fun", actions: 'Be' },
  { position: 5, title: 'Boron', user: 'Hydrogen', deadLineData: '2023-11-4', status: "fun", actions: 'B' },
  { position: 6, title: 'Carbon', user: 'Hydrogen', deadLineData: '2023-11-4', status: "fun", actions: 'C' },
  { position: 7, title: 'Nitrogen', user: 'Hydrogen', deadLineData: '2023-11-4', status: "fun", actions: 'N' },
  { position: 8, title: 'Oxygen', user: 'Hydrogen', deadLineData: '2023-11-4', status: "fun", actions: 'O' },
  { position: 9, title: 'Fluorine', user: 'Hydrogen', deadLineData: '2023-11-4', status: "fun", actions: 'F' },
  { position: 10, title: 'Neon', user: 'Hydrogen', deadLineData: '2023-11-4', status: "fun", actions: 'Ne' },
];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user', 'deadLineData', 'status', 'actions'];
  dataSource = ELEMENT_DATA;
  @Select(AllTasksState.allTasks) allTasks$!: Observable<any[]>;
  private store = inject(Store);
  public dialog = inject(MatDialog)
  constructor() { }

  ngOnInit(): void {
    this.allTasks$.subscribe(res => {
      debugger;
      console.log(res, res);
    });
    debugger;
    this.store.dispatch(new GetAllTasks());
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
