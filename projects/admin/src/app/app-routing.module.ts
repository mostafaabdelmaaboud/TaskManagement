import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.guard';
import { LoginGuard } from './auth/login.guard';

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
    canActivate: [LoginGuard]
  },

  { path: "**", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
