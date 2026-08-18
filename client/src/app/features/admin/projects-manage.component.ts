import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import type { Project } from '../../core/models';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="manage">
      <div class="page-head">
        <div>
          <h2>Projects</h2>
          <p>Manage your portfolio projects.</p>
        </div>
        <a routerLink="/admin/projects/new" class="btn btn-primary btn-sm">+ New Project</a>
      </div>

      @if (success()) {
        <div class="alert alert-success">{{ success() }}</div>
      }
      @if (error()) {
        <div class="alert alert-error">{{ error() }}</div>
      }

      <div class="toolbar card">
        <input
          type="search"
          class="form-control"
          placeholder="Search projects..."
          [(ngModel)]="search"
          style="max-width:320px;"
        />
      </div>

      @if (loading()) {
        <div class="card empty-state">Loading projects...</div>
      } @else if (filtered().length === 0) {
        <div class="card empty-state">
          No projects found. <a routerLink="/admin/projects/new">Create one &rarr;</a>
        </div>
      } @else {
        <div class="card table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Category</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of filtered()">
                <td>
                  <div class="p-name">{{ p.title }}</div>
                  <div class="p-slug mono">{{ p.slug }}</div>
                </td>
                <td><span class="badge" [ngClass]="statusBadge(p.status)">{{ p.status || 'Project' }}</span></td>
                <td>
                  <span class="check" [class.on]="p.featured">
                    {{ p.featured ? '&check;' : '&mdash;' }}
                  </span>
                </td>
                <td>{{ p.category || '&mdash;' }}</td>
                <td class="mono">{{ p.year || '&mdash;' }}</td>
                <td>
                  <div class="actions">
                    <a [routerLink]="['/admin/projects', p._id, 'edit']" class="btn btn-ghost btn-sm">Edit</a>
                    <button class="btn btn-danger btn-sm" (click)="remove(p)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .manage { max-width: 1100px; }
    .page-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
    .page-head h2 { margin: 0 0 .25rem; }
    .page-head p { margin: 0; color: var(--text-muted); font-size: var(--fs-sm); }

    .toolbar { padding: 1rem; margin-bottom: 1rem; }

    .empty-state { padding: 3rem; text-align: center; color: var(--text-dim); }
    .empty-state a { color: var(--accent); }

    .table-wrap { padding: 0; overflow-x: auto; }

    .table { width: 100%; border-collapse: collapse; }
    .table th, .table td {
      padding: 10px;
      border-bottom: 1px solid var(--border);
      text-align: left;
      font-size: var(--fs-sm);
    }
    .table th {
      background: var(--bg-soft);
      font-family: var(--font-mono);
      font-size: var(--fs-xs);
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: .05em;
      white-space: nowrap;
    }
    .table tr:last-child td { border-bottom: none; }
    .table tr:hover td { background: var(--bg-hover); }

    .p-name { font-weight: 600; }
    .p-slug { font-size: 10px; color: var(--text-dim); margin-top: 2px; }

    .check {
      display: inline-flex;
      width: 24px; height: 24px;
      align-items: center; justify-content: center;
      border-radius: 6px;
      background: var(--bg-soft);
      color: var(--text-dim);
      font-weight: 700;
    }
    .check.on { background: var(--gradient-soft); color: var(--accent); }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 10px;
      font-family: var(--font-mono);
      font-weight: 500;
    }

    .actions { display: flex; gap: .35rem; flex-wrap: wrap; }
  `]
})
export class AdminProjectsComponent implements OnInit {
  projects = signal<Project[]>([]);
  loading = signal(true);
  error = signal('');
  success = signal('');
  search = signal('');

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.projects();
    return this.projects().filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.status || '').toLowerCase().includes(q)
    );
  });

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.projectService.getAll().subscribe({
      next: (res) => { this.projects.set(res.data || []); this.loading.set(false); },
      error: (err) => { this.error.set(err?.error?.message || 'Failed to load projects.'); this.loading.set(false); },
    });
  }

  remove(p: Project) {
    if (!confirm(`Delete project "${p.title}"? This action cannot be undone.`)) return;
    this.projectService.remove(p._id!).subscribe({
      next: () => {
        this.projects.update(list => list.filter(x => x._id !== p._id));
        this.flash(`"${p.title}" deleted successfully.`, 'success');
      },
      error: (err) => this.flash(err?.error?.message || 'Failed to delete project.', 'error'),
    });
  }

  statusBadge(s?: string): string {
    return s === 'Project' ? 'badge-success' : s === 'In Progress' ? 'badge-info' : s === 'Concept / Prototype' ? 'badge-warning' : 'badge-muted';
  }

  private flash(msg: string, type: 'success' | 'error') {
    if (type === 'success') {
      this.success.set(msg);
      setTimeout(() => this.success.set(''), 3500);
    } else {
      this.error.set(msg);
      setTimeout(() => this.error.set(''), 4500);
    }
  }
}
