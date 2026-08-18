import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { Experience, ApiResponse } from '../core/models';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  constructor(private http: HttpClient) {}
  base = `${environment.apiUrl}/experiences`;
  getAll(type?: string) {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    return this.http.get<ApiResponse<Experience[]>>(this.base, { params });
  }
  getById(id: string) { return this.http.get<ApiResponse<Experience>>(`${this.base}/${id}`); }
  create(data: Partial<Experience>) { return this.http.post<ApiResponse<Experience>>(this.base, data); }
  update(id: string, data: Partial<Experience>) { return this.http.put<ApiResponse<Experience>>(`${this.base}/${id}`, data); }
  remove(id: string) { return this.http.delete<ApiResponse<any>>(`${this.base}/${id}`); }
}
