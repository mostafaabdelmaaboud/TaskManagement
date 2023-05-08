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
import { AddTaskModel, UsersModel } from '../../context/DTOs';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { TranslateService } from '@ngx-translate/core';
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
  selectedImage = false;
  newTaskForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  fileName = '';
  private toastr = inject(ToastrService);
  public translate = inject(TranslateService);
  formValues!: any;
  closeDialog = false;
  users: any[] = [
    { name: "Mohamed", id: "6452a0749bdca9984acf10f8" },
    { name: "Ahmed", id: "6452a0e79bdca9984acf10fe" },
    { name: "Mostafa", id: "6452a1049bdca9984acf1101" },
    { name: "shosho", id: "6452b8d3bd7e7eb41913875f" },
    { name: "SayedAli", id: "64593d6d13d1eb89fc1dbe71" },
    { name: "mostafaAbdelMaaboud", id: "6459416213d1eb89fc1dbe96" },
  ]
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
      debugger;
      if (this.data) {
        this.store.dispatch(new UpdateTask(form, this.data._id)).subscribe({
          next: res => {
            this.dialogRef.close();
            this.toastr.success(res.tasks.addTask.massage, 'Success', {
              timeOut: 2000
            });
          },
          error: err => {
            console.log(err, err);
            // this.error.handleError(err);
          }
        });
      } else {
        this.store.dispatch(new AddTask(form)).subscribe({
          next: res => {
            this.dialogRef.close();
            this.toastr.success(res.tasks.addTask.massage, 'Success', {
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
