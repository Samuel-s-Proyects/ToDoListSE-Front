import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {
  CreateAccountDialogComponent,
} from './dialogs/create-account-dialog/create-account-dialog.component';

@NgModule({
  declarations: [LoginPageComponent, CreateAccountDialogComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
