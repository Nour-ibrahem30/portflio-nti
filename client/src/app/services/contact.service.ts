import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { ContactMessage, ContactFormPayload, ApiResponse } from '../core/models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}
  base = `${environment.apiUrl}/contact`;

  send(payload: ContactFormPayload) {
    return this.http.post<ApiResponse<ContactMessage>>(this.base, payload);
  }

  getAll(status?: 'new' | 'read' | 'archived') {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<ContactMessage[]>>(this.base, { params });
  }

  updateStatus(id: string, status: 'new' | 'read' | 'archived') {
    return this.http.patch<ApiResponse<ContactMessage>>(`${this.base}/${id}/status`, { status });
  }

  remove(id: string) { return this.http.delete<ApiResponse<any>>(`${this.base}/${id}`); }
}
