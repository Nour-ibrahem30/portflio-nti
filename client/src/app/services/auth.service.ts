import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { environment } from '@environments/environment';
import type { User, AuthLoginPayload, AuthResponse, ApiResponse } from '../core/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'nour-token';
  private readonly USER_KEY = 'nour-user';

  private _user = signal<User | null>(this._readUser());
  private _token = signal<string | null>(this._readToken());

  user = this._user.asReadonly();
  token = this._token.asReadonly();
  isLoggedIn = computed(() => !!this._token());
  isAdmin = computed(() => this._user()?.role === 'admin');

  constructor(private http: HttpClient, private router: Router) {}

  private _readUser(): User | null {
    try { const raw = localStorage.getItem(this.USER_KEY); return raw ? JSON.parse(raw) : null; }
    catch { return null; }
  }
  private _readToken(): string | null { return localStorage.getItem(this.TOKEN_KEY); }

  login(payload: AuthLoginPayload) {
    return this.http.post<ApiResponse<AuthResponse>>(`${environment.apiUrl}/auth/login`, payload).pipe(
      tap((res) => {
        if (res.success && res.data) {
          localStorage.setItem(this.TOKEN_KEY, res.data.token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(res.data.user));
          this._token.set(res.data.token);
          this._user.set(res.data.user);
        }
      }),
      catchError((err) => {
        this.logout(false);
        throw err;
      })
    );
  }

  me() {
    return this.http.get<ApiResponse<User>>(`${environment.apiUrl}/auth/me`).pipe(
      tap((res) => {
        if (res.success && res.data) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(res.data));
          this._user.set(res.data);
        }
      }),
      catchError(() => of(null))
    );
  }

  logout(navigate = true) {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._token.set(null);
    this._user.set(null);
    if (navigate) this.router.navigate(['/']).catch(() => {});
  }
}
