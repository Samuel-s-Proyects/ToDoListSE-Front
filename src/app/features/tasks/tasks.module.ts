import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';
import { TaskFormDialogComponent } from './dialogs/task-form-dialog/task-form-dialog.component';

@NgModule({
  declarations: [TasksPageComponent, TaskDetailPageComponent, TaskFormDialogComponent],
  imports: [SharedModule, TasksRoutingModule],
})
export class TasksModule {}
