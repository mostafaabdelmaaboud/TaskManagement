import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { DeleteUser, GetAllUsers } from '../../store/actions/allUsers.actions';
import { UsersModel } from '../../context/DTOs';
import * as moment from 'moment';
import { AllUsersState } from '../../store/state/allUsers.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, debounceTime } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'projects/admin/src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  providers: [
    MatPaginatorIntl
  ]
})
export class ListUsersComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['position', 'username', 'email', 'status', 'role', 'actions'];
  dataSource: UsersModel[] = [];
  linkServer = environment.baseApi;
  isLoading = true;
  loading: any = {};
  public translate = inject(TranslateService);
  @Select(AllUsersState.allUsers) allUsers$!: Observable<any[]>;
  @Select(AllUsersState.massageDeleteUser) massageDeleteTaks$!: Observable<string | null>;
  @Select(AllUsersState.usersLoaded) usersLoaded$!: Observable<boolean>;
  @Select(AllUsersState.totalItems) totalItems$!: Observable<number>;

  private store = inject(Store);
  public dialog = inject(MatDialog);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  subscription!: Subscription;

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent!: PageEvent;

  formFilteration!: FormGroup;
  filteration: any = {
    page: 1,
    limit: 10
  };
  users: any[] = [
    { name: "Mohamed", id: "6452a0749bdca9984acf10f8" },
    { name: "islam", id: "6452a6e09bdca9984acf111a" },
    { name: "Ahmed", id: "6452a0e79bdca9984acf10fe" },
    { name: "Mostafa", id: "6452a1049bdca9984acf1101" },
    { name: "shosho", id: "6452b8d3bd7e7eb41913875f" }
  ]
  status: any[] = [
    { name: "Complete", id: 1 },
    { name: "In-Prossing", id: 2 },
  ]
  constructor(
    public _MatPaginatorIntl: MatPaginatorIntl
  ) { }

  ngOnInit(): void {
    this.paginationTranslate();
    this.translate.onLangChange.subscribe((lang) => {
      this.paginationTranslate();
    });
    this.createForm();

    this.subscription = this.allUsers$.subscribe((res: UsersModel[]) => {
      console.log(res, res);
      this.dataSource = this.mappingTasks(res);
    });

    this.massageDeleteTaks$.subscribe(res => {
      if (res != null) {
        this.toastr.success("Task Is Deleted", 'Success', {
          timeOut: 2000
        });
      }
    })
    this.totalItems$.subscribe(totalItems => {
      this.length = totalItems;
      console.log(totalItems)
    })
    this.usersLoaded$.subscribe(usersLoaded => {
      if (!usersLoaded) {
        this.store.dispatch(new GetAllUsers(this.filteration)).subscribe({
          next: res => {
            this.isLoading = false;
          },
          error: err => {
            this.isLoading = false;
          }
        });
      } else {
        this.isLoading = false;
      }
    })


    this.formFilteration.get("name")?.valueChanges.pipe(debounceTime(1000)).subscribe(formCotrol => {
      this.filteration.name = formCotrol;
      this.store.dispatch(new GetAllUsers(this.filteration));
    });


  }
  paginationTranslate() {
    this._MatPaginatorIntl.itemsPerPageLabel = this.translate.instant("MAT_PAGINATOR.ITEMS_PER_PAGE");
    this._MatPaginatorIntl.nextPageLabel = this.translate.instant("MAT_PAGINATOR.NEXT_PAGE");
    this._MatPaginatorIntl.lastPageLabel = this.translate.instant("MAT_PAGINATOR.LAST_PAGE");
    this._MatPaginatorIntl.firstPageLabel = this.translate.instant("MAT_PAGINATOR.FIRST_PAGE");
    this._MatPaginatorIntl.previousPageLabel = this.translate.instant("MAT_PAGINATOR.PREVIOUS_PAGE");
    this._MatPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      const of = this.translate ? this.translate.instant("MAT_PAGINATOR.OF") : "of";
      if (length === 0 || pageSize === 0) {
        return "0 " + of + " " + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;

      const endIndex = Math.min(startIndex + pageSize, length);
      return startIndex + 1 + " - " + endIndex + " " + of + " " + length;
    };
    this._MatPaginatorIntl.changes.next();
  }

  createForm() {
    this.formFilteration = this.fb.group({
      name: [""]
    })
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.filteration.page = this.pageIndex + 1;
    this.filteration.limit = this.pageSize;

    this.store.dispatch(new GetAllUsers(this.filteration))
  }

  deleteRow(id: string) {
    let objIndex = this.dataSource.findIndex((obj => obj._id === id));
    let conf = confirm("Want to delete?");
    if (conf) {
      this.dataSource[objIndex].loading = true;
      this.store.dispatch(new DeleteUser(id)).subscribe({
        next: data => {
          this.dataSource[objIndex].loading = false;
        },
        error: err => {
          this.dataSource[objIndex].loading = false;
        },
      })
      //Logic to delete the item
    }

  }
  mappingTasks(data: UsersModel[]): UsersModel[] {

    let newTasks: UsersModel[] = data?.map(item => {
      return {
        ...item,
        loading: false
      }
    });
    return newTasks
  }

  updateRow(element: UsersModel) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: "40vw",
      data: element
    });
  }
  ngOnDestroy() {
    this.filteration = {};
    this.subscription.unsubscribe();
    // this.store.reset({});

  }
}
