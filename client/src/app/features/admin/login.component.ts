import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-page">
      <div class="login-wrap">
        <div class="card login-card">
          <h1>Admin Login</h1>

          @if (success()) {
            <div class="alert alert-success" role="alert">{{ success() }}</div>
          }
          @if (error()) {
            <div class="alert alert-error" role="alert">{{ error() }}</div>
          }

          <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
            <div class="form-field">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                class="form-control"
                formControlName="email"
                placeholder="admin@example.com"
                autocomplete="email"
              />
              @if (isInvalid('email')) {
                <span class="form-error">
                  {{ form.get('email')?.hasError('required') ? 'Email is required.' : 'Please enter a valid email.' }}
                </span>
              }
            </div>

            <div class="form-field">
              <label for="password">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                formControlName="password"
                placeholder="••••••••"
                autocomplete="current-password"
              />
              @if (isInvalid('password')) {
                <span class="form-error">Password is required.</span>
              }
            </div>

            <button type="submit" class="btn btn-primary btn-block" [disabled]="loading()">
              @if (loading()) {
                <span class="spinner" style="width:14px;height:14px;border-width:2px;"></span>
                Signing in...
              } @else {
                Sign In
              }
            </button>
          </form>
        </div>

        <a routerLink="/" class="back-link">&larr; Back to portfolio</a>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }
    .login-wrap {
      width: 100%;
      max-width: 420px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    .login-card {
      width: 100%;
      padding: 2rem;
    }
    .login-card h1 {
      margin: 0 0 1.5rem;
      font-size: var(--fs-xl);
      text-align: center;
    }
    .back-link {
      font-size: var(--fs-sm);
      color: var(--text-muted);
      text-decoration: none;
    }
    .back-link:hover { color: var(--accent); }
  `]
})
export class AdminLoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
    password: ['', [Validators.required]],
  });
  loading = signal(false);
  error = signal('');
  success = signal('');
  private returnUrl = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');
    this.success.set('');
    this.authService.login(this.form.value as any).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res.success) {
          this.success.set('Login successful! Redirecting...');
          setTimeout(() => {
            this.router.navigateByUrl(this.returnUrl);
          }, 600);
        } else {
          this.error.set(res.message || 'Login failed.');
        }
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message || 'Invalid credentials. Please try again.';
        this.error.set(msg);
      },
    });
  }
}
