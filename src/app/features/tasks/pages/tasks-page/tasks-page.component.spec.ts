import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';

import { TasksPageComponent } from './tasks-page.component';
import { TasksDataAccessService } from '../../data-access/tasks-data-access.service';
import { CategoriesDataAccessService } from '../../../categories/data-access/categories-data-access.service';
import { Task } from '../../models/task.model';

const es = {
  common: {
    loading: 'Cargando...',
    create: 'Crear',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    search: 'Buscar',
  },
  tasks: {
    title: 'Mis tareas',
    empty: 'No tienes tareas aún',
    createTask: 'Nueva tarea',
    editTask: 'Editar tarea',
    deleteTask: 'Eliminar tarea',
    deleteConfirmTitle: 'Eliminar tarea',
    deleteConfirmMessage: '¿Estás seguro?',
    titleLabel: 'Título',
    titleRequired: 'Requerido',
    descriptionLabel: 'Descripción',
    allFilter: 'Todas',
    completedFilter: 'Completadas',
    pendingFilter: 'Pendientes',
    completedLabel: 'Completada',
    pendingLabel: 'Pendiente',
    loadMore: 'Cargar más',
    loadError: 'Error al cargar',
    createError: 'Error al crear',
    conflictError: 'Conflicto',
  },
};

const mockTask: Task = {
  id: 'task-1',
  title: 'Test task',
  description: 'desc',
  completed: false,
  categoryId: null,
  userId: 'user-1',
  version: 1,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  updatedBy: 'user-1',
};

describe('TasksPageComponent', () => {
  let component: TasksPageComponent;
  let tasksDataAccess: jasmine.SpyObj<TasksDataAccessService>;
  let categoriesDataAccess: jasmine.SpyObj<CategoriesDataAccessService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    tasksDataAccess = jasmine.createSpyObj('TasksDataAccessService', [
      'list', 'create', 'update', 'toggle', 'delete',
    ]);
    categoriesDataAccess = jasmine.createSpyObj('CategoriesDataAccessService', [
      'list',
    ]);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    tasksDataAccess.list.and.returnValue(of({
      items: [mockTask],
      pageInfo: { hasNextPage: false, nextCursor: null },
    }));
    categoriesDataAccess.list.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [TasksPageComponent],
      imports: [
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { es },
          translocoConfig: { availableLangs: ['es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        { provide: TasksDataAccessService, useValue: tasksDataAccess },
        { provide: CategoriesDataAccessService, useValue: categoriesDataAccess },
        { provide: MatDialog, useValue: dialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    const fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(tasksDataAccess.list).toHaveBeenCalled();
    expect(component.tasks).toEqual([mockTask]);
    expect(component.loading).toBe(false);
  });

  it('should set error state when list fails', fakeAsync(() => {
    tasksDataAccess.list.and.returnValue(throwError(() => ({ code: 'INTERNAL_ERROR' })));

    component.onRetry();
    tick();

    expect(component.errorMessageKey).toBe('tasks.loadError');
    expect(component.loading).toBe(false);
  }));

  it('should change filter and reload tasks', fakeAsync(() => {
    tasksDataAccess.list.calls.reset();

    component.onFilterChange('completed');
    tick();

    expect(component.activeFilter).toBe('completed');
    expect(tasksDataAccess.list).toHaveBeenCalledWith(
      jasmine.objectContaining({ completed: true }),
    );
  }));

  it('should toggle task status', fakeAsync(() => {
    const toggled = { ...mockTask, completed: true, version: 2 };
    tasksDataAccess.toggle.and.returnValue(of(toggled));

    component.onToggleTask(mockTask);
    tick();

    expect(tasksDataAccess.toggle).toHaveBeenCalledWith('task-1', { version: 1 });
    expect(component.tasks[0].completed).toBe(true);
  }));

  it('should delete task after confirmation', fakeAsync(() => {
    const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
    dialog.open.and.returnValue(dialogRef);
    tasksDataAccess.delete.and.returnValue(of(undefined as unknown as void));

    component.onDeleteTask(mockTask);
    tick();

    expect(tasksDataAccess.delete).toHaveBeenCalledWith('task-1');
    expect(component.tasks).toEqual([]);
  }));

  it('should not delete task when dialog is cancelled', fakeAsync(() => {
    const dialogRef = { afterClosed: () => of(false) } as MatDialogRef<unknown>;
    dialog.open.and.returnValue(dialogRef);

    component.onDeleteTask(mockTask);
    tick();

    expect(tasksDataAccess.delete).not.toHaveBeenCalled();
    expect(component.tasks).toEqual([mockTask]);
  }));

  it('trackByTaskId should return task id', () => {
    expect(component.trackByTaskId(0, mockTask)).toBe('task-1');
  });
});
