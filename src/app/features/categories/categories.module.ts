import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CategoryFormDialogComponent } from './dialogs/category-form-dialog/category-form-dialog.component';

@NgModule({
  declarations: [CategoriesPageComponent, CategoryFormDialogComponent],
  imports: [SharedModule, CategoriesRoutingModule],
})
export class CategoriesModule {}
