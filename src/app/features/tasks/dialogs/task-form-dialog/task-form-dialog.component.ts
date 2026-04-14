import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskFormDialogData, TaskFormDialogResult } from './task-form-dialog.model';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss'],
})
export class TaskFormDialogComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    description: new FormControl('', [Validators.maxLength(1000)]),
    categoryId: new FormControl<string | null>(null),
    completed: new FormControl<boolean>(false),
  });

  get isEditing(): boolean {
    return !!this.data.task;
  }

  constructor(
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormDialogData,
  ) {}

  ngOnInit(): void {
    if (this.data.task) {
      this.form.patchValue({
        title: this.data.task.title,
        description: this.data.task.description,
        categoryId: this.data.task.categoryId,
        completed: this.data.task.completed,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close({ confirmed: false } as TaskFormDialogResult);
  }

  onConfirm(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.dialogRef.close({
      confirmed: true,
      title: this.form.value.title?.trim(),
      description: this.form.value.description?.trim() ?? '',
      categoryId: this.form.value.categoryId ?? null,
      completed: this.form.value.completed ?? false,
    } as TaskFormDialogResult);
  }
}
