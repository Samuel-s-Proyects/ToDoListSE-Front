import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';

import { CategoriesPageComponent } from './categories-page.component';
import { CategoriesDataAccessService } from '../../data-access/categories-data-access.service';
import { Category } from '../../models/category.model';

const es = {
  common: {
    loading: 'Cargando...',
    create: 'Crear',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
  },
  categories: {
    title: 'Categorías',
    empty: 'No tienes categorías aún',
    createCategory: 'Nueva categoría',
    editCategory: 'Editar categoría',
    deleteCategory: 'Eliminar categoría',
    deleteConfirmTitle: 'Eliminar categoría',
    deleteConfirmMessage: '¿Estás seguro?',
    nameLabel: 'Nombre',
    nameRequired: 'Requerido',
    colorLabel: 'Color',
    loadError: 'Error al cargar',
    createError: 'Error al crear',
    updateError: 'Error al actualizar',
    deleteError: 'Error al eliminar',
    validationError: 'Error de validación',
  },
};

const mockCategory: Category = {
  id: 'cat-1',
  name: 'Work',
  color: '#ff0000',
  userId: 'user-1',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
};

describe('CategoriesPageComponent', () => {
  let component: CategoriesPageComponent;
  let categoriesDataAccess: jasmine.SpyObj<CategoriesDataAccessService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    categoriesDataAccess = jasmine.createSpyObj('CategoriesDataAccessService', [
      'list', 'create', 'update', 'delete',
    ]);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    categoriesDataAccess.list.and.returnValue(of([mockCategory]));

    await TestBed.configureTestingModule({
      declarations: [CategoriesPageComponent],
      imports: [
        TranslocoTestingModule.forRoot({
          langs: { es },
          translocoConfig: { availableLangs: ['es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        { provide: CategoriesDataAccessService, useValue: categoriesDataAccess },
        { provide: MatDialog, useValue: dialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    const fixture = TestBed.createComponent(CategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(categoriesDataAccess.list).toHaveBeenCalled();
    expect(component.categories).toEqual([mockCategory]);
    expect(component.loading).toBe(false);
  });

  it('should set error state when list fails', fakeAsync(() => {
    categoriesDataAccess.list.and.returnValue(throwError(() => ({ code: 'INTERNAL_ERROR' })));

    component.onRetry();
    tick();

    expect(component.errorMessageKey).toBe('categories.loadError');
    expect(component.loading).toBe(false);
  }));

  it('should delete category after confirmation', fakeAsync(() => {
    const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
    dialog.open.and.returnValue(dialogRef);
    categoriesDataAccess.delete.and.returnValue(of(undefined as unknown as void));

    component.onDeleteCategory(mockCategory);
    tick();

    expect(categoriesDataAccess.delete).toHaveBeenCalledWith('cat-1');
    expect(component.categories).toEqual([]);
  }));

  it('should not delete category when dialog is cancelled', fakeAsync(() => {
    const dialogRef = { afterClosed: () => of(false) } as MatDialogRef<unknown>;
    dialog.open.and.returnValue(dialogRef);

    component.onDeleteCategory(mockCategory);
    tick();

    expect(categoriesDataAccess.delete).not.toHaveBeenCalled();
    expect(component.categories).toEqual([mockCategory]);
  }));

  it('should set error when delete fails', fakeAsync(() => {
    const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
    dialog.open.and.returnValue(dialogRef);
    categoriesDataAccess.delete.and.returnValue(throwError(() => ({ code: 'INTERNAL_ERROR' })));

    component.onDeleteCategory(mockCategory);
    tick();

    expect(component.errorMessageKey).toBe('categories.deleteError');
  }));

  it('trackByCategoryId should return category id', () => {
    expect(component.trackByCategoryId(0, mockCategory)).toBe('cat-1');
  });
});
