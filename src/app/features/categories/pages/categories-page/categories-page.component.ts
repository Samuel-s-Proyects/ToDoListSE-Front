import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { CategoriesDataAccessService } from '../../data-access/categories-data-access.service';
import { Category } from '../../models/category.model';
import { NormalizedError } from '../../../../core/models/normalized-error.model';
import {
  CategoryFormDialogComponent,
} from '../../dialogs/category-form-dialog/category-form-dialog.component';
import {
  CategoryFormDialogData,
  CategoryFormDialogResult,
} from '../../dialogs/category-form-dialog/category-form-dialog.model';
import {
  ConfirmDialogComponent,
} from '../../../../shared/ui/organisms/dialogs/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../../../shared/ui/organisms/dialogs/confirm-dialog/confirm-dialog.model';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  categories: Category[] = [];
  loading = false;
  errorMessageKey: string | null = null;
  successMessageKey: string | null = null;

  readonly faPlus = faPlus;
  readonly faTrash = faTrash;
  readonly faPen = faPen;

  constructor(
    private readonly categoriesDataAccess: CategoriesDataAccessService,
    private readonly dialog: MatDialog,
    private readonly transloco: TranslocoService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  trackByCategoryId(_index: number, category: Category): string {
    return category.id;
  }

  onCreateCategory(): void {
    const dialogData: CategoryFormDialogData = {
      titleKey: 'categories.createCategory',
      nameLabelKey: 'categories.nameLabel',
      nameRequiredKey: 'categories.nameRequired',
      colorLabelKey: 'categories.colorLabel',
      confirmKey: 'common.create',
      cancelKey: 'common.cancel',
    };

    const dialogRef = this.dialog.open(CategoryFormDialogComponent, {
      data: dialogData,
      width: '420px',
      maxWidth: '90vw',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result: CategoryFormDialogResult | undefined) => {
      if (!result?.confirmed) return;

      this.categoriesDataAccess.create({
        name: result.name!,
        color: result.color!,
      }).subscribe({
        next: () => {
          this.successMessageKey = 'categories.createSuccess';
          this.loadCategories();
        },
        error: (err: NormalizedError) => {
          this.errorMessageKey = err.code === 'VALIDATION_ERROR'
            ? 'categories.validationError'
            : 'categories.createError';
        },
      });
    });
  }

  onEditCategory(category: Category): void {
    const dialogData: CategoryFormDialogData = {
      category,
      titleKey: 'categories.editCategory',
      nameLabelKey: 'categories.nameLabel',
      nameRequiredKey: 'categories.nameRequired',
      colorLabelKey: 'categories.colorLabel',
      confirmKey: 'common.save',
      cancelKey: 'common.cancel',
    };

    const dialogRef = this.dialog.open(CategoryFormDialogComponent, {
      data: dialogData,
      width: '420px',
      maxWidth: '90vw',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result: CategoryFormDialogResult | undefined) => {
      if (!result?.confirmed) return;

      this.categoriesDataAccess.update(category.id, {
        name: result.name,
        color: result.color,
      }).subscribe({
        next: (updated) => {
          this.categories = this.categories.map((c) => (c.id === updated.id ? updated : c));
          this.successMessageKey = 'categories.updateSuccess';
        },
        error: () => {
          this.errorMessageKey = 'categories.updateError';
        },
      });
    });
  }

  onDeleteCategory(category: Category): void {
    const dialogData: ConfirmDialogData = {
      title: this.transloco.translate('categories.deleteConfirmTitle'),
      message: this.transloco.translate('categories.deleteConfirmMessage'),
      confirmLabel: this.transloco.translate('common.delete'),
      cancelLabel: this.transloco.translate('common.cancel'),
      confirmVariant: 'warn',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      width: '400px',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;

      this.categoriesDataAccess.delete(category.id).subscribe({
        next: () => {
          this.categories = this.categories.filter((c) => c.id !== category.id);
          this.successMessageKey = 'categories.deleteSuccess';
        },
        error: () => {
          this.errorMessageKey = 'categories.deleteError';
        },
      });
    });
  }

  onRetry(): void {
    this.errorMessageKey = null;
    this.successMessageKey = null;
    this.loadCategories();
  }

  private loadCategories(): void {
    this.loading = true;
    this.errorMessageKey = null;

    this.categoriesDataAccess.list().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessageKey = 'categories.loadError';
      },
    });
  }
}
