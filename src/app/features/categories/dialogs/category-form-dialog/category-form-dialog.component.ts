import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryFormDialogData, CategoryFormDialogResult } from './category-form-dialog.model';

const DEFAULT_COLOR = '#0099ff';

@Component({
  selector: 'app-category-form-dialog',
  templateUrl: './category-form-dialog.component.html',
  styleUrls: ['./category-form-dialog.component.scss'],
})
export class CategoryFormDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    color: new FormControl(DEFAULT_COLOR, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CategoryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryFormDialogData,
  ) {}

  ngOnInit(): void {
    if (this.data.category) {
      this.form.patchValue({
        name: this.data.category.name,
        color: this.data.category.color,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close({ confirmed: false } as CategoryFormDialogResult);
  }

  onConfirm(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.dialogRef.close({
      confirmed: true,
      name: this.form.value.name?.trim(),
      color: this.form.value.color,
    } as CategoryFormDialogResult);
  }
}
