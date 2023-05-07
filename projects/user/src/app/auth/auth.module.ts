import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/state/login.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { RegisterComponent } from './components/register/register.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatSelectModule,
    NgxsModule.forFeature([AuthState])

  ]
})
export class AuthModule { }
