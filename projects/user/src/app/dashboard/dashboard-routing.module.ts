import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const childRoutes = [
  { path: "", loadChildren: () => import("./task-user/task-user.module").then(m => m.TaskUserModule) },
  // { path: "users", loadChildren: () => import("./users/users.module").then(m => m.UsersModule) }

]


const routes: Routes = [
  { path: "", component: LayoutComponent, children: childRoutes },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
