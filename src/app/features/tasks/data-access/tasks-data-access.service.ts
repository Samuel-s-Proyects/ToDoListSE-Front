import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  ToggleTaskPayload,
  ListTasksParams,
} from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksDataAccessService {
  private readonly baseUrl = `${environment.apiBaseUrl}/tasks`;

  constructor(private readonly http: HttpClient) {}

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  list(params: ListTasksParams = {}): Observable<PaginatedResponse<Task>> {
    let httpParams = new HttpParams();

    if (params.limit != null) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    if (params.cursor) {
      httpParams = httpParams.set('cursor', params.cursor);
    }
    if (params.categoryId) {
      httpParams = httpParams.set('categoryId', params.categoryId);
    }
    if (params.completed != null) {
      httpParams = httpParams.set('completed', params.completed.toString());
    }
    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<PaginatedResponse<Task>>(this.baseUrl, { params: httpParams });
  }

  create(payload: CreateTaskPayload): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, payload);
  }

  update(id: string, payload: UpdateTaskPayload): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, payload);
  }

  toggle(id: string, payload: ToggleTaskPayload): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${id}/toggle`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
