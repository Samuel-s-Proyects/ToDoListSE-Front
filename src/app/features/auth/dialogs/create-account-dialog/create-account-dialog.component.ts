import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { CreateAccountDialogData, CreateAccountDialogResult } from './create-account-dialog.model';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss'],
})
export class CreateAccountDialogComponent {
  nameControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  constructor(
    public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateAccountDialogData,
  ) {}

  onCancel(): void {
    this.dialogRef.close({ confirmed: false } as CreateAccountDialogResult);
  }

  onConfirm(): void {
    this.nameControl.markAsTouched();
    if (this.nameControl.invalid) return;

    this.dialogRef.close({
      confirmed: true,
      name: this.nameControl.value?.trim(),
    } as CreateAccountDialogResult);
  }
}
