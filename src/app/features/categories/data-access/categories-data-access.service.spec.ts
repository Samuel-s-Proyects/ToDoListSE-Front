import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriesDataAccessService } from './categories-data-access.service';
import { environment } from '../../../../environments/environment';
import { Category } from '../models/category.model';

describe('CategoriesDataAccessService', () => {
  let service: CategoriesDataAccessService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.apiBaseUrl}/categories`;

  const mockCategory: Category = {
    id: 'cat-1',
    name: 'Work',
    color: '#ff0000',
    userId: 'user-1',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesDataAccessService],
    });
    service = TestBed.inject(CategoriesDataAccessService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('list', () => {
    it('should call GET /categories', () => {
      service.list().subscribe((res) => {
        expect(res).toEqual([mockCategory]);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush([mockCategory]);
    });
  });

  describe('create', () => {
    it('should call POST /categories with payload', () => {
      const payload = { name: 'Work', color: '#ff0000' };

      service.create(payload).subscribe((res) => {
        expect(res.id).toBe('cat-1');
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);
      req.flush(mockCategory);
    });
  });

  describe('update', () => {
    it('should call PUT /categories/:id with payload', () => {
      const payload = { name: 'Personal' };

      service.update('cat-1', payload).subscribe((res) => {
        expect(res.name).toBe('Personal');
      });

      const req = httpMock.expectOne(`${baseUrl}/cat-1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(payload);
      req.flush({ ...mockCategory, name: 'Personal' });
    });
  });

  describe('delete', () => {
    it('should call DELETE /categories/:id', () => {
      service.delete('cat-1').subscribe();

      const req = httpMock.expectOne(`${baseUrl}/cat-1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
