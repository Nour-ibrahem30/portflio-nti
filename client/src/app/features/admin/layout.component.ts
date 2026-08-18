import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-shell" [class.sidebar-open]="sidebarOpen()">
      <aside class="admin-sidebar card" [class.open]="sidebarOpen()">
        <div class="sidebar-header">
          <a routerLink="/admin" class="sidebar-brand">
            <div class="brand-icon">N</div>
            <div>
              <div class="sb-name">Admin Panel</div>
              <div class="sb-sub mono">Portfolio CMS</div>
            </div>
          </a>
          <button class="icon-btn sidebar-close" (click)="sidebarOpen.set(false)" aria-label="Close sidebar">
            &times;
          </button>
        </div>

        <nav class="sidebar-nav" aria-label="Admin navigation">
          <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-item">
            <span class="nav-icon">&#9632;</span>
            Dashboard
          </a>

          <div class="nav-group">
            <a routerLink="/admin/projects" routerLinkActive="active" class="nav-item">
              <span class="nav-icon">&#9679;</span>
              Projects
            </a>
            <a routerLink="/admin/projects/new" routerLinkActive="active" class="nav-item sub">
              &boxvr; New Project
            </a>
          </div>

          <a routerLink="/admin/experiences" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">&#9679;</span>
            Experiences
          </a>

          <a routerLink="/admin/skills" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">&#9679;</span>
            Skills
          </a>

          <a routerLink="/admin/messages" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">&#9679;</span>
            Messages
          </a>

          <div class="nav-sep"></div>

          <button class="nav-item logout" (click)="logout()">
            <span class="nav-icon">&#10150;</span>
            Logout
          </button>
        </nav>
      </aside>

      <div class="sidebar-overlay" [class.visible]="sidebarOpen()" (click)="sidebarOpen.set(false)"></div>

      <div class="admin-main">
        <header class="admin-topbar card">
          <button class="icon-btn hamburger" (click)="sidebarOpen.set(true)" aria-label="Open sidebar">
            &#9776;
          </button>
          <div class="topbar-title mono">
            <span class="dim">admin /</span>
            <span class="page">{{ currentPage() }}</span>
          </div>
          <div class="topbar-right">
            <span class="user-name">{{ authService.user()?.name || 'Admin' }}</span>
            <button class="btn btn-ghost btn-sm" (click)="logout()">
              Logout
            </button>
          </div>
        </header>

        <main class="admin-content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .admin-shell {
      display: flex;
      min-height: 100vh;
      background: var(--bg);
    }

    .admin-sidebar {
      width: 260px;
      flex-shrink: 0;
      background: var(--bg-alt);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      border-radius: 0;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1rem;
      border-bottom: 1px solid var(--border);
    }
    .sidebar-brand {
      display: inline-flex;
      align-items: center;
      gap: .65rem;
      color: var(--text);
      text-decoration: none;
    }
    .brand-icon {
      width: 36px; height: 36px;
      border-radius: 8px;
      background: var(--gradient);
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
    }
    .sb-name { font-weight: 700; font-size: var(--fs-sm); line-height: 1; }
    .sb-sub { font-size: 10px; color: var(--text-dim); margin-top: 3px; }
    .sidebar-close { display: none; }

    .sidebar-nav {
      flex: 1;
      padding: 1rem .75rem;
      display: flex;
      flex-direction: column;
      gap: .15rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: .65rem;
      padding: .6rem .85rem;
      border-radius: var(--radius);
      color: var(--text-muted);
      font-size: var(--fs-sm);
      font-weight: 500;
      transition: all var(--transition);
      text-decoration: none;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      width: 100%;
    }
    .nav-item.sub { padding-left: 2.1rem; font-size: var(--fs-xs); }
    .nav-item:hover { color: var(--text); background: var(--bg-hover); }
    .nav-item.active { color: var(--accent); background: var(--bg-soft); }
    .nav-item.logout { color: var(--danger); margin-top: auto; }
    .nav-item.logout:hover { background: rgba(239,68,68,.1); }
    .nav-icon { font-size: 10px; opacity: .7; }
    .nav-sep { height: 1px; background: var(--border); margin: .5rem 0; }
    .nav-group { display: flex; flex-direction: column; gap: .15rem; }

    .admin-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }

    .admin-topbar {
      height: 60px;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0 1.5rem;
      background: var(--bg-alt);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 10;
      border-radius: 0;
    }
    .hamburger { display: none; }
    .topbar-title { font-size: var(--fs-xs); display: flex; gap: .35rem; align-items: center; }
    .topbar-title .dim { color: var(--text-dim); }
    .topbar-title .page { color: var(--accent); }
    .topbar-right { margin-left: auto; display: flex; align-items: center; gap: .75rem; }
    .user-name { font-size: var(--fs-sm); font-weight: 600; }

    .admin-content { flex: 1; padding: 2rem 1.5rem; }

    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.5);
      z-index: 30;
    }

    @media (max-width: 900px) {
      .admin-sidebar {
        position: fixed;
        left: -280px;
        top: 0;
        bottom: 0;
        z-index: 40;
        transition: left var(--transition);
        height: 100%;
      }
      .admin-sidebar.open { left: 0; }
      .sidebar-close { display: flex; }
      .hamburger { display: flex; }
      .sidebar-overlay { display: block; opacity: 0; pointer-events: none; transition: opacity var(--transition); }
      .sidebar-overlay.visible { opacity: 1; pointer-events: all; }
    }
  `]
})
export class AdminLayoutComponent {
  sidebarOpen = signal(false);

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  currentPage(): string {
    const url = this.router.url.replace('/admin', '').replace('/', '') || 'dashboard';
    return url.split('/')[0] || 'dashboard';
  }

  logout() {
    this.authService.logout(false);
    this.router.navigate(['/admin/login']);
  }
}
