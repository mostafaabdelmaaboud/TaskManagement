import { Component, Inject, NgZone, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Observable, take } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';
import { Select, Store } from '@ngxs/store';
import { AddTask, UpdateTask } from '../../store/actions/allTasks.actions';
import { AllTasksState } from '../../store/state/allTasks.state';
import { ToastrService } from 'ngx-toastr';
import { HandleErrorService } from 'projects/admin/src/app/services/handle-error.service';
import { AddTaskModel, UserID, UsersModel, listUserID } from '../../context/DTOs';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { TranslateService } from '@ngx-translate/core';
import { AllUsersState } from '../../../users/store/state/allUsers.state';
import { GetAllUsers } from '../../../users/store/actions/allUsers.actions';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  private fb = inject(FormBuilder);
  private store = inject(Store);
  isLoaded = false;
  @Select(AllTasksState.addTaskIsLoaded) addTaskIsLoaded$!: Observable<boolean>;
  @Select(AllTasksState.massageCreateTaks) massageCreateTaks$!: Observable<string | null>;
  @Select(AllUsersState.usersLoaded) usersLoaded$!: Observable<boolean>;
  @Select(AllUsersState.allUsers) allUsers$!: Observable<any[]>;
  selectedImage = false;
  newTaskForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  fileName = '';
  private toastr = inject(ToastrService);
  public translate = inject(TranslateService);
  formValues!: any;
  closeDialog = false;
  users: listUserID[] = []
  filteration: any = {
    page: 1,
    limit: 10
  };
  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    public matDialig: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: UsersModel,
    private _ngZone: NgZone,
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.creatForm();
    this.addTaskIsLoaded$.subscribe(res => {
      this.isLoaded = res;
    });
    console.log("data dialog", this.data);
    if (this.data) {
      this.fileName = this.data.image;
    }
    this.allUsers$.subscribe((res: UserID[]) => {
      console.log(res, res);
      this.users = this.mappingTasks(res);
    });
    this.usersLoaded$.subscribe(usersLoaded => {
      if (!usersLoaded) {
        this.store.dispatch(new GetAllUsers(this.filteration))
      }
    })

  }
  mappingTasks(data: UserID[]): any[] {

    let newTasks: listUserID[] = data?.map(item => {
      return {
        name: item.username,
        id: item._id

      }
    });
    return newTasks
  }
  creatForm() {
    this.newTaskForm = this.fb.group({
      title: [this.data?.title || "", [Validators.required, Validators.minLength(5)]],
      userId: [this.data?.userId?._id || "", Validators.required],
      image: [this.data?.image || "", Validators.required],
      description: [this.data?.description || "", Validators.required],
      deadline: [this.data ? new Date(this.data?.deadline.split("-").reverse().join("-")).toISOString() : "", Validators.required]
    });
    this.formValues = this.newTaskForm.value;
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  onNoClick(): void {
    this.closeDialog = false;

    Object.keys(this.formValues).forEach((item: string) => {
      if (this.formValues[item] != this.newTaskForm.value[item]) {
        this.closeDialog = true;
      }

    });
    if (!this.closeDialog) {
      this.dialogRef.close();
    } else {
      const dialogRef = this.matDialig.open(ConfirmationComponent, {
        width: "30vw"
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.newTaskForm.get('image')?.setValue(file);
    console.log(this.newTaskForm.value);
  }
  createTask() {
    this.selectedImage = true;
    let form: FormData = this.prepareFormData();

    if (this.newTaskForm.valid) {
      if (this.data) {
        this.store.dispatch(new UpdateTask(form, this.data._id)).subscribe({
          next: res => {
            this.dialogRef.close();
            this.toastr.success(res.tasks.addTask.massage, 'Success', {
              timeOut: 2000
            });
          }
        });
      } else {
        this.store.dispatch(new AddTask(form)).subscribe({
          next: res => {
            this.dialogRef.close();
            this.toastr.success(res.tasks.addTask.massage, 'Success', {
              timeOut: 2000
            });
          }
        });
      }

    }
  }
  prepareFormData() {
    let newDate = moment(this.newTaskForm.get('deadline')?.value).format("DD-MM-YYYY");
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
      if (key === "deadline") {
        formData.append(key, newDate);
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  }

}
