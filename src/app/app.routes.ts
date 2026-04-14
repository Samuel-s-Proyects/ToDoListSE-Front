import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layout/private-layout/private-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'login',
        canActivate: [publicGuard],
        loadChildren: () =>
          import('./features/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'tasks',
        loadChildren: () =>
          import('./features/tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
