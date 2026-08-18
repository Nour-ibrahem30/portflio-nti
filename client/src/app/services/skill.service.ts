import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { Skill, ApiResponse } from '../core/models';

@Injectable({ providedIn: 'root' })
export class SkillService {
  constructor(private http: HttpClient) {}
  base = `${environment.apiUrl}/skills`;
  getAll(category?: string) {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    return this.http.get<ApiResponse<Skill[]>>(this.base, { params });
  }
  getById(id: string) { return this.http.get<ApiResponse<Skill>>(`${this.base}/${id}`); }
  create(data: Partial<Skill>) { return this.http.post<ApiResponse<Skill>>(this.base, data); }
  update(id: string, data: Partial<Skill>) { return this.http.put<ApiResponse<Skill>>(`${this.base}/${id}`, data); }
  remove(id: string) { return this.http.delete<ApiResponse<any>>(`${this.base}/${id}`); }
}
