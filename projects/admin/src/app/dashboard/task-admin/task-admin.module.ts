import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskAdminRoutingModule } from './task-admin-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { AllTasksState } from './store/state/allTasks.state';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ListTasksComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    TaskAdminRoutingModule,
    SharedModule,
    MatTableModule,
    NgxsModule.forFeature([AllTasksState]),
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule

  ]
})
export class TaskAdminModule { }
