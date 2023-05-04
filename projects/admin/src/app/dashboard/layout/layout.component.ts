import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Logout } from 'projects/admin/src/app/auth/store/actions/login.actions';
import { AuthState } from 'projects/admin/src/app/auth/store/state/login.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Select(AuthState.getAuthLogin) stateAuth$!: Observable<String | null>;
  public isCollapsed = true;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.store.dispatch(new Logout()).subscribe(logout => {
      this.router.navigate(["/login"]);
    })
  }
}
