import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthDataAccessService } from './auth-data-access.service';
import { environment } from '../../../../environments/environment';

describe('AuthDataAccessService', () => {
  let service: AuthDataAccessService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthDataAccessService],
    });
    service = TestBed.inject(AuthDataAccessService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call POST /auth/login with email', () => {
    const mockResponse = {
      token: 'jwt-token',
      user: { id: '1', email: 'test@test.com', name: 'Test' },
    };

    service.login('test@test.com').subscribe((res) => {
      expect(res.token).toBe('jwt-token');
      expect(res.user.email).toBe('test@test.com');
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@test.com' });
    req.flush(mockResponse);
  });

  it('should call POST /auth/register with email and name', () => {
    const mockResponse = {
      token: 'jwt-token',
      user: { id: '2', email: 'new@test.com', name: 'New User' },
    };

    service.register('new@test.com', 'New User').subscribe((res) => {
      expect(res.token).toBe('jwt-token');
      expect(res.user.name).toBe('New User');
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'new@test.com', name: 'New User' });
    req.flush(mockResponse);
  });
});
