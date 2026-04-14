import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';

const routes: Routes = [
  { path: '', component: TasksPageComponent },
  { path: ':id', component: TaskDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
