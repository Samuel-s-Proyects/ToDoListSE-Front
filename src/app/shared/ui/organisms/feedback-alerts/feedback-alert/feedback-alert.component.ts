import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertType } from './feedback-alert.model';

@Component({
  selector: 'app-feedback-alert',
  templateUrl: './feedback-alert.component.html',
  styleUrls: ['./feedback-alert.component.scss'],
})
export class FeedbackAlertComponent {
  @Input() type: AlertType = 'info';
  @Input() message = '';
  @Input() dismissible = false;
  @Output() dismissed = new EventEmitter<void>();
  visible = true;

  dismiss(): void {
    this.visible = false;
    this.dismissed.emit();
  }
}
