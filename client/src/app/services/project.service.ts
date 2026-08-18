import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { Project, ApiResponse } from '../core/models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private http: HttpClient) {}
  base = `${environment.apiUrl}/projects`;

  getAll(query?: { featured?: boolean; category?: string; status?: string; search?: string }) {
    let params = new HttpParams();
    if (query) {
      if (query.featured !== undefined) params = params.set('featured', String(query.featured));
      if (query.category) params = params.set('category', query.category);
      if (query.status) params = params.set('status', query.status);
      if (query.search) params = params.set('search', query.search);
    }
    return this.http.get<ApiResponse<Project[]>>(this.base, { params });
  }

  getBySlug(slug: string) {
    return this.http.get<ApiResponse<Project>>(`${this.base}/slug/${slug}`);
  }

  getById(id: string) { return this.http.get<ApiResponse<Project>>(`${this.base}/${id}`); }
  create(data: Partial<Project>) { return this.http.post<ApiResponse<Project>>(this.base, data); }
  update(id: string, data: Partial<Project>) { return this.http.put<ApiResponse<Project>>(`${this.base}/${id}`, data); }
  remove(id: string) { return this.http.delete<ApiResponse<any>>(`${this.base}/${id}`); }
}
