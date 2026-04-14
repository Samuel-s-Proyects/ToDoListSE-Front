import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoModule } from '@jsverse/transloco';
import { ClickOutsideDirective } from '../shared/directives/click-outside.directive';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { PublicTopbarComponent } from './public-layout/public-topbar/public-topbar.component';
import { PublicFooterComponent } from './public-layout/public-footer/public-footer.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { PrivateTopbarComponent } from './private-layout/private-topbar/private-topbar.component';
import { PrivateSidebarComponent } from './private-layout/private-sidebar/private-sidebar.component';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    PublicTopbarComponent,
    PublicFooterComponent,
    PrivateLayoutComponent,
    PrivateTopbarComponent,
    PrivateSidebarComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    TranslocoModule,
  ],
  exports: [
    PublicLayoutComponent,
    PrivateLayoutComponent,
  ],
})
export class LayoutModule {}
