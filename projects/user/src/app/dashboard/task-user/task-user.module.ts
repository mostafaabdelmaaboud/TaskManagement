import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskUserRoutingModule } from './task-user-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    TaskUserRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class TaskUserModule { }
