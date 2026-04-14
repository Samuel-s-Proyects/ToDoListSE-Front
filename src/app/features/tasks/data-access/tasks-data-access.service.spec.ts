import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TasksDataAccessService } from './tasks-data-access.service';
import { environment } from '../../../../environments/environment';

describe('TasksDataAccessService', () => {
  let service: TasksDataAccessService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.apiBaseUrl}/tasks`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksDataAccessService],
    });
    service = TestBed.inject(TasksDataAccessService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('list', () => {
    it('should call GET /tasks with default params', () => {
      const mockResponse = {
        items: [],
        pageInfo: { hasNextPage: false, nextCursor: null },
      };

      service.list().subscribe((res) => {
        expect(res.items).toEqual([]);
        expect(res.pageInfo.hasNextPage).toBe(false);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should pass query params when provided', () => {
      service.list({
        limit: 10,
        cursor: 'abc',
        completed: true,
        search: 'hello',
      }).subscribe();

      const req = httpMock.expectOne(
        (r) => r.url === baseUrl && r.params.get('limit') === '10',
      );
      expect(req.request.params.get('cursor')).toBe('abc');
      expect(req.request.params.get('completed')).toBe('true');
      expect(req.request.params.get('search')).toBe('hello');
      req.flush({ items: [], pageInfo: { hasNextPage: false, nextCursor: null } });
    });
  });

  describe('create', () => {
    it('should call POST /tasks with payload', () => {
      const payload = { title: 'New', description: '', categoryId: null };
      const mockTask = { id: '1', ...payload, completed: false, version: 1 };

      service.create(payload).subscribe((res) => {
        expect(res.id).toBe('1');
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);
      req.flush(mockTask);
    });
  });

  describe('update', () => {
    it('should call PUT /tasks/:id with payload', () => {
      const payload = { title: 'Updated', version: 1 };

      service.update('task-1', payload).subscribe();

      const req = httpMock.expectOne(`${baseUrl}/task-1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(payload);
      req.flush({});
    });
  });

  describe('toggle', () => {
    it('should call PATCH /tasks/:id/toggle with version', () => {
      service.toggle('task-1', { version: 2 }).subscribe();

      const req = httpMock.expectOne(`${baseUrl}/task-1/toggle`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({ version: 2 });
      req.flush({});
    });
  });

  describe('delete', () => {
    it('should call DELETE /tasks/:id', () => {
      service.delete('task-1').subscribe();

      const req = httpMock.expectOne(`${baseUrl}/task-1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
