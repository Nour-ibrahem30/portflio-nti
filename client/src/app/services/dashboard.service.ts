import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { DashboardStats, ApiResponse } from '../core/models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}
  getStats() { return this.http.get<ApiResponse<DashboardStats>>(`${environment.apiUrl}/dashboard/stats`); }
}
