import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/login.guard';
import { AuthGuard } from './auth/auth-guard.guard';

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: "register",
  //   // loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
  //   // canActivate: [AuthGuard]
  // },


  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
