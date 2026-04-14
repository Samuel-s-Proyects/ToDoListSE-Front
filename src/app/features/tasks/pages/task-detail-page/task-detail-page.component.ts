import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { faArrowLeft, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { TasksDataAccessService } from '../../data-access/tasks-data-access.service';
import { CategoriesDataAccessService } from '../../../categories/data-access/categories-data-access.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail-page',
  templateUrl: './task-detail-page.component.html',
  styleUrls: ['./task-detail-page.component.scss'],
})
export class TaskDetailPageComponent implements OnInit {
  task: Task | null = null;
  categoryName: string | null = null;
  loading = true;
  errorMessageKey: string | null = null;

  readonly faArrowLeft = faArrowLeft;
  readonly faCheck = faCheck;
  readonly faClock = faClock;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly tasksDataAccess: TasksDataAccessService,
    private readonly categoriesDataAccess: CategoriesDataAccessService,
    private readonly transloco: TranslocoService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/tasks']);
      return;
    }
    this.loadTask(id);
  }

  onBack(): void {
    this.router.navigate(['/tasks']);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const lang = this.transloco.getActiveLang();
    return date.toLocaleDateString(lang === 'es' ? 'es-PA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private loadTask(id: string): void {
    this.loading = true;
    this.tasksDataAccess.getById(id).subscribe({
      next: (task) => {
        this.task = task;
        this.loading = false;
        if (task.categoryId) {
          this.loadCategoryName(task.categoryId);
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessageKey = 'tasks.loadError';
      },
    });
  }

  private loadCategoryName(categoryId: string): void {
    this.categoriesDataAccess.list().subscribe({
      next: (categories) => {
        const cat = categories.find((c) => c.id === categoryId);
        this.categoryName = cat ? cat.name : null;
      },
    });
  }
}
