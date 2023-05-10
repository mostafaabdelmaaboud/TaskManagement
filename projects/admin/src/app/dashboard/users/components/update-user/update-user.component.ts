import { Component, OnInit, Inject, NgZone, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsersModel } from '../../context/DTOs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AllUsersState } from '../../store/state/allUsers.state';
import { Observable, take } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { UpdateUser } from '../../store/actions/allUsers.actions';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  private fb = inject(FormBuilder);
  private store = inject(Store);
  isLoaded = false;
  @Select(AllUsersState.updateUserIsLoaded) addTaskIsLoaded$!: Observable<boolean>;
  @Select(AllUsersState.massageUpdateUser) massageCreateTaks$!: Observable<string | null>;
  selectedImage = false;
  newTaskForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  fileName = '';
  private toastr = inject(ToastrService);
  public translate = inject(TranslateService);

  formValues!: any;
  closeDialog = false;
  status: any[] = [
    { name: "Active", id: "Active" },
    { name: "inactive", id: "inactive" }
  ]
  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
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

  }
  creatForm() {
    this.newTaskForm = this.fb.group({
      id: [this.data?._id || "", [Validators.required]],
      status: [this.data?.status || "", Validators.required],
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


  createTask() {
    this.selectedImage = true;
    if (this.newTaskForm.valid) {
      this.store.dispatch(new UpdateUser(this.newTaskForm.value)).subscribe({
        next: res => {
          this.dialogRef.close();
          this.toastr.success(res.users.updateUser.massage, 'Success', {
            timeOut: 2000
          });
        },
        error: err => {
          console.log(err, err);
          // this.error.handleError(err);
        }
      });

    }
  }


}
