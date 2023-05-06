import { Component, OnInit, inject } from '@angular/core';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  public translate = inject(TranslateService);

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public matDialig: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  confirm() {
    this.matDialig.closeAll();
  }
  close() {
    this.dialogRef.close();

  }
}
