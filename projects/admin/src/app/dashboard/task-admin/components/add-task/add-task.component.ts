import { Component, Inject, NgZone, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ListTasksService } from '../../services/list-tasks.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { CreateTaskModel } from '../../context/DTOs';
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
  private tasksService = inject(ListTasksService);
  selectedImage = false;
  newTaskForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  fileName = '';

  users: any = [
    { name: "mohamed", id: 1 },
    { name: "Ali", id: 2 },
    { name: "Ahmed", id: 3 },
    { name: "Zain", id: 4 }
  ]
  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ngZone: NgZone
  ) { }
  ngOnInit(): void {
    this.creatForm();
  }
  creatForm() {
    this.newTaskForm = this.fb.group({
      title: ["", Validators.required],
      userId: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
      deadline: ["", Validators.required]
    })
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    debugger;
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.newTaskForm.get('image')?.setValue(file);
    console.log(this.newTaskForm.value);

    if (this.newTaskForm.valid) {
      debugger;
      // this.tasksService.addTask(this.newTaskForm.value)
    }
    // if (file) {
    //   this.fileName = file.name;
    //   const formData = new FormData();
    //   formData.append("thumbnail", file);
    // }
  }
  createTask() {
    this.selectedImage = true;
    let form: FormData = this.prepareFormData();
    this.tasksService.addTask(form).subscribe(res => {
      this.newTaskForm.reset();
      console.log(res)
    })

  }
  prepareFormData() {
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
      formData.append(key, value);
    });
    return formData;

  }
}
