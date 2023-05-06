import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { AllUsersState } from './store/state/allUsers.state';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';


@NgModule({
  declarations: [
    ListUsersComponent,
    UpdateUserComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatTableModule,
    NgxsModule.forFeature([AllUsersState]),
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule

  ]
})
export class UsersModule { }
