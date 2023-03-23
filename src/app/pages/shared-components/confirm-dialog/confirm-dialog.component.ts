import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() warningMsg: string = "Do you really want to take this action?";
  @Input() cancelBtnClasses: { [key: string]: string } = {};
  @Input() confirmBtnClasses: { [key: string]: string } = {};
  constructor(
    private readonly dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  confirmed() {
    this.dialogRef.close(true);
  }

}
