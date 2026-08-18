import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { Education, ApiResponse } from '../core/models';

@Injectable({ providedIn: 'root' })
export class EducationService {
  constructor(private http: HttpClient) {}
  base = `${environment.apiUrl}/education`;
  getAll() { return this.http.get<ApiResponse<Education[]>>(this.base); }
  create(data: Partial<Education>) { return this.http.post<ApiResponse<Education>>(this.base, data); }
  update(id: string, data: Partial<Education>) { return this.http.put<ApiResponse<Education>>(`${this.base}/${id}`, data); }
  remove(id: string) { return this.http.delete<ApiResponse<any>>(`${this.base}/${id}`); }
}
