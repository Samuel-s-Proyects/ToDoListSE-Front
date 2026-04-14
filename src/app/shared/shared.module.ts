import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoModule } from '@jsverse/transloco';

// Atoms
import { ButtonComponent } from './ui/atoms/buttons/button/button.component';
import { SpinnerComponent } from './ui/atoms/spinners/spinner/spinner.component';
import { IconComponent } from './ui/atoms/icons/icon/icon.component';
import { InputComponent } from './ui/atoms/inputs/input/input.component';

// Molecules
import { EmptyStateComponent } from './ui/molecules/states/empty-state/empty-state.component';
import { LoadingStateComponent } from './ui/molecules/states/loading-state/loading-state.component';
import { ErrorStateComponent } from './ui/molecules/states/error-state/error-state.component';

// Organisms
import {
  FeedbackAlertComponent,
} from './ui/organisms/feedback-alerts/feedback-alert/feedback-alert.component';
import {
  ConfirmDialogComponent,
} from './ui/organisms/dialogs/confirm-dialog/confirm-dialog.component';

const SHARED_COMPONENTS = [
  ButtonComponent,
  SpinnerComponent,
  IconComponent,
  InputComponent,
  EmptyStateComponent,
  LoadingStateComponent,
  ErrorStateComponent,
  FeedbackAlertComponent,
  ConfirmDialogComponent,
];

const SHARED_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  TranslocoModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
];

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [...SHARED_MODULES],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_MODULES,
  ],
})
export class SharedModule {}
