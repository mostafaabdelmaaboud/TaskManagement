import { Component, OnInit, inject, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AllTasksState } from '../../store/state/allTasks.state';
import { Observable, Subscription, debounceTime, take } from 'rxjs';
import { DeleteTask, GetAllTasks } from '../../store/actions/allTasks.actions';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Filteration, ListUsersModel, UserID, UsersModel, listUserID } from '../../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';
import { HandleErrorService } from 'projects/admin/src/app/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { AllUsersState } from '../../../users/store/state/allUsers.state';
import { GetAllUsers } from '../../../users/store/actions/allUsers.actions';



@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
  providers: [
    MatPaginatorIntl
  ]
})

export class ListTasksComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['position', 'title', 'user', 'deadline', 'status', 'actions'];
  dataSource: UsersModel[] = [];
  linkServer = environment.baseApi;
  isLoading = true;
  loading: any = {};
  public translate = inject(TranslateService);
  @Select(AllTasksState.allTasks) allTasks$!: Observable<any[]>;
  @Select(AllTasksState.massageDeleteTaks) massageDeleteTaks$!: Observable<string | null>;
  @Select(AllTasksState.tasksLoaded) tasksLoaded$!: Observable<boolean>;
  @Select(AllTasksState.totalItems) totalItems$!: Observable<number>;
  @Select(AllUsersState.usersLoaded) usersLoaded$!: Observable<boolean>;
  @Select(AllUsersState.allUsers) allUsers$!: Observable<any[]>;
  private store = inject(Store);
  public dialog = inject(MatDialog);
  private error = inject(HandleErrorService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  subscription!: Subscription;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent!: PageEvent;

  formFilteration!: FormGroup;
  filteration: Filteration = {
    page: 1,
    limit: 10
  };

  users: listUserID[] = []


  status: any[] = [
    { name: "Complete", id: "Complete" },
    { name: "In-Progress", id: "In-Progress" },
  ]
  constructor(
    public _MatPaginatorIntl: MatPaginatorIntl,
    public matDialig: MatDialog,

  ) { }

  ngOnInit(): void {
    this.paginationTranslate();
    this.translate.onLangChange.subscribe((lang) => {
      this.paginationTranslate();
    });
    this.createForm();

    this.subscription = this.allTasks$.subscribe((res: UsersModel[]) => {

      console.log(res, res);
      this.dataSource = this.mappingTasks(res);

    });
    this.allUsers$.subscribe((res: UserID[]) => {
      console.log(res, res);
      this.users = res?.map(item => {
        return {
          name: item.username,
          id: item._id

        }
      });
    });
    this.store.dispatch(new GetAllUsers(this.filteration))

    this.totalItems$.subscribe(totalItems => {
      this.length = totalItems;
      console.log(totalItems)
    })

    this.tasksLoaded$.subscribe(tasksLoaded => {
      if (!tasksLoaded) {
        this.store.dispatch(new GetAllTasks(this.filteration)).subscribe({
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

    this.formFilteration.get("keyword")?.valueChanges.pipe(debounceTime(1000)).subscribe(formCotrol => {
      this.prepareFilteration("keyword", formCotrol);
    });
    this.formFilteration.get("userId")?.valueChanges.subscribe(formCotrol => {
      this.prepareFilteration("userId", formCotrol);

    });
    this.formFilteration.get("status")?.valueChanges.subscribe(formCotrol => {
      // console.log("formCotrol status", formCotrol);
      this.prepareFilteration("status", formCotrol);

    });
    this.formFilteration.get("range")?.valueChanges.subscribe(formCotrol => {
      console.log("formCotrol range", formCotrol);
      this.filteration.fromDate = null;
      this.filteration.toDate = null;

      let formatDate = formCotrol;
      if (formCotrol.fromDate != null) {
        this.filteration.fromDate = moment(formCotrol.fromDate).format("DD-MM-YYYY");
      }

      if (formCotrol.toDate != null && formCotrol.fromDate != null) {
        this.filteration.toDate = moment(formCotrol.toDate).format("DD-MM-YYYY");
        if (this.filteration.toDate != this.filteration.fromDate) {
          this.prepareFilteration("toDate", this.filteration.fromDate);

        }
      }
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
      keyword: [""],
      userId: [""],
      status: [""],
      range: this.fb.group({
        fromDate: [null],
        toDate: [null]
      })
    })
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.filteration.page = this.pageIndex + 1;
    this.filteration.limit = this.pageSize;

    this.store.dispatch(new GetAllTasks(this.filteration))
  }
  prepareFilteration(type: string, value: any) {
    switch (type) {
      case "keyword":
        this.filteration.keyword = value;
        this.store.dispatch(new GetAllTasks(this.filteration));
        break;
      case "userId":
        this.filteration.userId = value;
        this.store.dispatch(new GetAllTasks(this.filteration));
        break;
      case "status":
        this.filteration.status = value;
        this.store.dispatch(new GetAllTasks(this.filteration));
        break;
      case "toDate":
        this.store.dispatch(new GetAllTasks(this.filteration));
        break;
      default:
        this.store.dispatch(new GetAllTasks(this.filteration));
        break;
    }

  }
  deleteRow(id: string) {
    let objIndex = this.dataSource.findIndex((obj => obj._id === id));
    // let conf = confirm("Want to delete?");
    const dialogRef = this.matDialig.open(ConfirmationComponent, {
      width: "30vw",
      data: {
        text: "Want to delete?",
        dataType: "DeleteTask"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.data = result;
      if (result === "DeletedTask") {
        this.dataSource[objIndex].loading = true;
        this.store.dispatch(new DeleteTask(id)).subscribe({
          next: data => {
            this.dataSource[objIndex].loading = false;
            this.toastr.success("Task Is Deleted", 'Success', {
              timeOut: 2000
            });
          },
          error: err => {
            this.dataSource[objIndex].loading = false;
          },
        })
        //Logic to delete the item
      }
    });


  }
  mappingTasks(data: UsersModel[]): UsersModel[] {
    let newTasks: UsersModel[] | any = data.map((item) => {
      return {
        ...item,
        loading: false,
        user: item?.userId?.username || ""
      }

    });
    return newTasks;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "40vw",
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  updateRow(element: UsersModel) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "40vw",
      data: element
    });
  }
  ngOnDestroy() {
    this.filteration = {};
    this.subscription.unsubscribe();
  }

}
