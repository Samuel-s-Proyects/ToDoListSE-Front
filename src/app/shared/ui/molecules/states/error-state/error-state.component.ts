import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.scss'],
})
export class ErrorStateComponent {
  @Input() message = '';
  @Input() retryLabel = '';
  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}
