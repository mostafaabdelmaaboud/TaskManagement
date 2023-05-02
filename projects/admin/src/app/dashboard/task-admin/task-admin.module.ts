import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskAdminRoutingModule } from './task-admin-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  declarations: [
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    TaskAdminRoutingModule,
    SharedModule,
    MatTableModule

  ]
})
export class TaskAdminModule { }
