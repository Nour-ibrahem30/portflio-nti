import { Component, Signal, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ThemeService } from '../core/theme.service';
import { AuthService } from '../services/auth.service';
import type { Theme } from '../core/models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="nav" [class.scrolled]="scrolled()">
      <div class="container nav-inner">
        <a routerLink="/" class="brand" aria-label="Nour Ibrahem - Home">
          <span class="brand-mark">
            <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
              <defs>
                <linearGradient id="ng" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#6366f1"/>
                  <stop offset="50%" stop-color="#a855f7"/>
                  <stop offset="100%" stop-color="#22d3ee"/>
                </linearGradient>
              </defs>
              <rect width="40" height="40" rx="10" fill="url(#ng)"/>
              <text x="20" y="26" font-family="ui-monospace,monospace" font-size="18" font-weight="700" fill="#fff" text-anchor="middle">N</text>
            </svg>
          </span>
          <span class="brand-text">
            <span class="brand-name">Nour Ibrahem</span>
            <span class="brand-tag mono">/dev</span>
          </span>
        </a>

        <nav class="links" aria-label="Main navigation">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
          <a routerLink="/skills" routerLinkActive="active">Skills</a>
          <a routerLink="/experience" routerLinkActive="active">Experience</a>
          <a routerLink="/projects" routerLinkActive="active">Projects</a>
          <a routerLink="/contact" routerLinkActive="active">Contact</a>
        </nav>

        <div class="actions">
          <button type="button" class="icon-btn" (click)="theme.toggle()" [attr.aria-label]="'Switch theme (current: ' + theme.appliedTheme() + ')'">
            <svg *ngIf="theme.appliedTheme() === 'dark'" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/><line x1="4.2" y1="19.8" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.8" y2="4.2"/></g></svg>
            <svg *ngIf="theme.appliedTheme() === 'light'" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
          </button>

          <a *ngIf="!auth.isLoggedIn()" routerLink="/admin/login" class="btn btn-sm btn-secondary">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"/></svg>
            Admin
          </a>
          <a *ngIf="auth.isLoggedIn()" routerLink="/admin" class="btn btn-sm btn-primary">Dashboard</a>

          <button class="icon-btn menu" (click)="toggleMenu()" aria-label="Toggle menu" aria-expanded="open()">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" *ngIf="!open()"><path fill="currentColor" d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/></svg>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" *ngIf="open()"><path fill="currentColor" d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/></svg>
          </button>
        </div>
      </div>

      <div class="mobile-nav" [class.open]="open()">
        <a routerLink="/" (click)="open.set(false)">Home</a>
        <a routerLink="/about" (click)="open.set(false)">About</a>
        <a routerLink="/skills" (click)="open.set(false)">Skills</a>
        <a routerLink="/experience" (click)="open.set(false)">Experience</a>
        <a routerLink="/projects" (click)="open.set(false)">Projects</a>
        <a routerLink="/contact" (click)="open.set(false)">Contact</a>
        <div class="divider"></div>
        <a *ngIf="!auth.isLoggedIn()" routerLink="/admin/login" (click)="open.set(false)" class="btn btn-primary btn-block">Admin Login</a>
        <a *ngIf="auth.isLoggedIn()" routerLink="/admin" (click)="open.set(false)" class="btn btn-primary btn-block">Dashboard</a>
      </div>
    </header>
  `,
  styles: [`
    .nav {
      position: sticky;
      top: 0; z-index: 50;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      background: color-mix(in srgb, var(--bg) 78%, transparent);
      border-bottom: 1px solid transparent;
      transition: border-color var(--transition), background var(--transition);
    }
    .nav.scrolled { border-bottom-color: var(--border); }
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
      height: 72px; gap: 1rem;
    }
    .brand { display: inline-flex; align-items: center; gap: .65rem; color: var(--text); }
    .brand:hover { color: var(--text); }
    .brand-mark { display: inline-flex; }
    .brand-text { display: flex; flex-direction: column; line-height: 1; }
    .brand-name { font-weight: 700; font-size: var(--fs-sm); letter-spacing: -.01em; }
    .brand-tag { font-size: 10px; color: var(--text-dim); margin-top: 3px; }

    .links { display: flex; align-items: center; gap: .25rem; }
    .links a {
      padding: .5rem .85rem; font-size: var(--fs-sm); color: var(--text-muted);
      border-radius: var(--radius-sm); font-weight: 500; transition: all var(--transition);
      &:hover { color: var(--text); background: var(--bg-hover); }
      &.active { color: var(--accent); background: var(--gradient-soft); }
    }
    .actions { display: flex; align-items: center; gap: .5rem; }
    .icon-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 38px; height: 38px;
      background: var(--bg-elev); border: 1px solid var(--border);
      color: var(--text-muted); border-radius: var(--radius);
      cursor: pointer; transition: all var(--transition);
      &:hover { color: var(--accent); border-color: var(--accent); }
      &:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    }
    .icon-btn.menu { display: none; }

    .mobile-nav {
      display: none;
      flex-direction: column;
      padding: 0 var(--gutter) 1.25rem;
      gap: .25rem;
      border-top: 1px solid var(--border);
      overflow: hidden; max-height: 0;
      transition: max-height var(--transition-slow), padding var(--transition-slow);
    }
    .mobile-nav.open { display: flex; max-height: 600px; padding-top: 1rem; }
    .mobile-nav a {
      padding: .75rem 1rem; font-size: var(--fs-base); color: var(--text-muted);
      border-radius: var(--radius); background: var(--bg-soft);
      &:hover { color: var(--text); background: var(--bg-hover); }
    }
    .divider { height: 1px; background: var(--border); margin: .25rem 0; }

    @media (max-width: 900px) {
      .links { display: none; }
      .actions .btn { display: none; }
      .icon-btn.menu { display: inline-flex; }
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  scrolled = signal(false);
  open = signal(false);
  private _scrollListener?: () => void;

  constructor(public theme: ThemeService, public auth: AuthService, private router: Router) {}

  ngOnInit() {
    const handler = () => this.scrolled.set(window.scrollY > 20);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    this._scrollListener = () => window.removeEventListener('scroll', handler);
    this.router.events.subscribe(() => this.open.set(false));
  }
  ngOnDestroy() { this._scrollListener?.(); }

  toggleMenu() { this.open.update((v) => !v); }
}
