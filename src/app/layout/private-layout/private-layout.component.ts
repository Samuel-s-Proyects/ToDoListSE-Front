import { Component } from '@angular/core';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
})
export class PrivateLayoutComponent {
  sidebarOpen = false;

  onToggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onSidebarClosed(): void {
    this.sidebarOpen = false;
  }
}
