import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() errorMessages: Record<string, string> = {};

  get errorKey(): string | null {
    if (!this.control.errors || !this.control.touched) {
      return null;
    }
    return Object.keys(this.control.errors)[0] || null;
  }
}
