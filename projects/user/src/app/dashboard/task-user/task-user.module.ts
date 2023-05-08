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


@NgModule({
  declarations: [
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    TaskUserRoutingModule,
    MatCardModule,
    NgxsModule.forFeature([TasksUser]),
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxPaginationModule
  ]
})
export class TaskUserModule { }
