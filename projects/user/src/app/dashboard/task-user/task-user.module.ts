import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskUserRoutingModule } from './task-user-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxsModule } from '@ngxs/store';
import { TasksUser } from './store/state/taskUser.state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { SharedModule } from 'projects/admin/src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListTasksComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    TaskUserRoutingModule,
    MatCardModule,
    SharedModule,
    NgxsModule.forFeature([TasksUser]),
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxPaginationModule
  ]
})
export class TaskUserModule { }
