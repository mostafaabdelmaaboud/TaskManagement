import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AuthState } from '../auth/store/state/login.state';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    LayoutComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgxsModule.forFeature([AuthState]),
    MatSelectModule
  ]
})
export class DashboardModule { }
