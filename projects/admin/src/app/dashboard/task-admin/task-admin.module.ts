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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AllUsersState } from '../users/store/state/allUsers.state';
import { NotFoundImageComponent } from '../../shared/components/not-found-image/not-found-image.component';


@NgModule({
  declarations: [
    ListTasksComponent,
    AddTaskComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    TaskAdminRoutingModule,
    SharedModule,
    MatTableModule,
    NgxsModule.forFeature([AllTasksState, AllUsersState]),
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,

    MatProgressSpinnerModule,
    NotFoundImageComponent

  ]
})
export class TaskAdminModule { }
