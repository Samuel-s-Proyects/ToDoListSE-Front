import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faListCheck,
  faTags,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-private-sidebar',
  templateUrl: './private-sidebar.component.html',
  styleUrls: ['./private-sidebar.component.scss'],
})
export class PrivateSidebarComponent {
  @Input() open = false;
  @Output() readonly closed = new EventEmitter<void>();

  readonly faListCheck = faListCheck;
  readonly faTags = faTags;
  readonly faXmark = faXmark;

  onClose(): void {
    this.closed.emit();
  }

  onOverlayClick(): void {
    this.closed.emit();
  }

  onNavClick(): void {
    this.closed.emit();
  }
}
