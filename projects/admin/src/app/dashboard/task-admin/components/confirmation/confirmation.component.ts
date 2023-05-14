import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  textConfirmation = "";
  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    public matDialig: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { text: string, dataType: string }
  ) { }
  ngOnInit(): void {
    if (this.data) {
      this.textConfirmation = this.data.text;
    }
  }
  confirm() {
    debugger;
    if (this.data.dataType == "DeleteTask") {
      this.data.dataType = "DeletedTask";
      this.dialogRef.close(this.data.dataType);
    } else {
      this.matDialig.closeAll();
    }
  }
  close() {
    this.dialogRef.close();
  }
}
