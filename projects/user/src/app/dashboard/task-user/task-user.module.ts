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
import { HideMissingDirective } from '../../directives/hide-missing.directive';
import { NotFoundImageComponent } from '../../shared/components/not-found-image/not-found-image.component';


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
    NgxPaginationModule,
    NotFoundImageComponent
  ]
})
export class TaskUserModule { }
