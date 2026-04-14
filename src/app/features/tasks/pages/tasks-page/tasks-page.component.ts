import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { faPlus, faCheck, faClock, faList, faTrash, faPen, faTag, faEye } from '@fortawesome/free-solid-svg-icons';
import { TasksDataAccessService } from '../../data-access/tasks-data-access.service';
import { Task, TaskFilter } from '../../models/task.model';
import { Category } from '../../../categories/models/category.model';
import { CategoriesDataAccessService } from '../../../categories/data-access/categories-data-access.service';
import { NormalizedError } from '../../../../core/models/normalized-error.model';
import {
  TaskFormDialogComponent,
} from '../../dialogs/task-form-dialog/task-form-dialog.component';
import {
  TaskFormDialogData,
  TaskFormDialogResult,
} from '../../dialogs/task-form-dialog/task-form-dialog.model';
import {
  ConfirmDialogComponent,
} from '../../../../shared/ui/organisms/dialogs/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../../../shared/ui/organisms/dialogs/confirm-dialog/confirm-dialog.model';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  categories: Category[] = [];
  loading = false;
  loadingMore = false;
  errorMessageKey: string | null = null;
  successMessageKey: string | null = null;
  activeFilter: TaskFilter = 'all';
  activeCategoryId: string | null = null;
  searchControl = new FormControl('');
  hasNextPage = false;
  nextCursor: string | null = null;

  readonly faPlus = faPlus;
  readonly faCheck = faCheck;
  readonly faClock = faClock;
  readonly faList = faList;
  readonly faTrash = faTrash;
  readonly faPen = faPen;
  readonly faTag = faTag;
  readonly faEye = faEye;

  private readonly destroy$ = new Subject<void>();
  private readonly PAGE_SIZE = 20;

  constructor(
    private readonly tasksDataAccess: TasksDataAccessService,
    private readonly categoriesDataAccess: CategoriesDataAccessService,
    private readonly dialog: MatDialog,
    private readonly transloco: TranslocoService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTasks();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.loadTasks());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByTaskId(_index: number, task: Task): string {
    return task.id;
  }

  onFilterChange(filter: TaskFilter): void {
    this.activeFilter = filter;
    this.loadTasks();
  }

  onCategoryFilterChange(categoryId: string | null): void {
    this.activeCategoryId = categoryId;
    this.loadTasks();
  }

  onViewTask(task: Task): void {
    this.router.navigate(['/tasks', task.id]);
  }

  getCategoryName(categoryId: string | null): string | null {
    if (!categoryId) return null;
    const cat = this.categories.find((c) => c.id === categoryId);
    return cat ? cat.name : null;
  }

  getCategoryColor(categoryId: string | null): string | null {
    if (!categoryId) return null;
    const cat = this.categories.find((c) => c.id === categoryId);
    return cat ? cat.color : null;
  }

  onLoadMore(): void {
    if (!this.hasNextPage || !this.nextCursor || this.loadingMore) return;

    this.loadingMore = true;
    this.tasksDataAccess.list({
      limit: this.PAGE_SIZE,
      cursor: this.nextCursor,
      completed: this.getCompletedFilter(),
      categoryId: this.activeCategoryId ?? undefined,
      search: this.getSearchValue(),
    }).subscribe({
      next: (response) => {
        this.tasks = [...this.tasks, ...response.items];
        this.hasNextPage = response.pageInfo.hasNextPage;
        this.nextCursor = response.pageInfo.nextCursor;
        this.loadingMore = false;
      },
      error: () => {
        this.loadingMore = false;
      },
    });
  }

  onCreateTask(): void {
    const dialogData: TaskFormDialogData = {
      categories: this.categories,
      titleKey: 'tasks.createTask',
      titleLabelKey: 'tasks.titleLabel',
      titleRequiredKey: 'tasks.titleRequired',
      descriptionLabelKey: 'tasks.descriptionLabel',
      categoryLabelKey: 'tasks.categoryLabel',
      noCategoryKey: 'categories.noCategoryFilter',
      confirmKey: 'common.create',
      cancelKey: 'common.cancel',
    };

    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      data: dialogData,
      width: '480px',
      maxWidth: '90vw',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result: TaskFormDialogResult | undefined) => {
      if (!result?.confirmed) return;

      this.tasksDataAccess.create({
        title: result.title!,
        description: result.description ?? '',
        categoryId: result.categoryId ?? null,
      }).subscribe({
        next: () => {
          this.successMessageKey = 'tasks.createSuccess';
          this.loadTasks();
        },
        error: (err: NormalizedError) => {
          this.errorMessageKey = err.code === 'VALIDATION_ERROR'
            ? 'tasks.validationError'
            : 'tasks.createError';
        },
      });
    });
  }

  onEditTask(task: Task): void {
    const dialogData: TaskFormDialogData = {
      task,
      categories: this.categories,
      titleKey: 'tasks.editTask',
      titleLabelKey: 'tasks.titleLabel',
      titleRequiredKey: 'tasks.titleRequired',
      descriptionLabelKey: 'tasks.descriptionLabel',
      categoryLabelKey: 'tasks.categoryLabel',
      noCategoryKey: 'categories.noCategoryFilter',
      confirmKey: 'common.save',
      cancelKey: 'common.cancel',
      statusLabelKey: 'tasks.statusLabel',
      completedLabelKey: 'tasks.completedLabel',
      pendingLabelKey: 'tasks.pendingLabel',
    };

    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      data: dialogData,
      width: '480px',
      maxWidth: '90vw',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result: TaskFormDialogResult | undefined) => {
      if (!result?.confirmed) return;

      this.tasksDataAccess.update(task.id, {
        title: result.title,
        description: result.description,
        categoryId: result.categoryId,
        completed: result.completed,
        version: task.version,
      }).subscribe({
        next: (updated) => {
          this.tasks = this.tasks.map((t) => (t.id === updated.id ? updated : t));
          this.successMessageKey = 'tasks.updateSuccess';
        },
        error: (err: NormalizedError) => {
          this.errorMessageKey = err.code === 'CONFLICT'
            ? 'tasks.conflictError'
            : 'tasks.updateError';
        },
      });
    });
  }

  onToggleTask(task: Task): void {
    this.tasksDataAccess.toggle(task.id, { version: task.version }).subscribe({
      next: (updated) => {
        this.tasks = this.tasks.map((t) => (t.id === updated.id ? updated : t));
        this.successMessageKey = 'tasks.toggleSuccess';
      },
      error: (err: NormalizedError) => {
        this.errorMessageKey = err.code === 'CONFLICT'
          ? 'tasks.conflictError'
          : 'tasks.toggleError';
      },
    });
  }

  onDeleteTask(task: Task): void {
    const dialogData: ConfirmDialogData = {
      title: this.transloco.translate('tasks.deleteConfirmTitle'),
      message: this.transloco.translate('tasks.deleteConfirmMessage'),
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

      this.tasksDataAccess.delete(task.id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((t) => t.id !== task.id);
          this.successMessageKey = 'tasks.deleteSuccess';
        },
        error: () => {
          this.errorMessageKey = 'tasks.deleteError';
        },
      });
    });
  }

  onRetry(): void {
    this.errorMessageKey = null;
    this.successMessageKey = null;
    this.loadTasks();
  }

  private loadTasks(): void {
    this.loading = true;
    this.errorMessageKey = null;

    this.tasksDataAccess.list({
      limit: this.PAGE_SIZE,
      completed: this.getCompletedFilter(),
      categoryId: this.activeCategoryId ?? undefined,
      search: this.getSearchValue(),
    }).subscribe({
      next: (response) => {
        this.tasks = response.items;
        this.hasNextPage = response.pageInfo.hasNextPage;
        this.nextCursor = response.pageInfo.nextCursor;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessageKey = 'tasks.loadError';
      },
    });
  }

  private getCompletedFilter(): boolean | undefined {
    if (this.activeFilter === 'completed') return true;
    if (this.activeFilter === 'pending') return false;
    return undefined;
  }

  private getSearchValue(): string | undefined {
    const value = this.searchControl.value?.trim();
    return value || undefined;
  }

  private loadCategories(): void {
    this.categoriesDataAccess.list().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }
}
