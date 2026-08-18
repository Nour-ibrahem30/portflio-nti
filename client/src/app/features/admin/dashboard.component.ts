import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { ProjectService } from '../../services/project.service';
import { ExperienceService } from '../../services/experience.service';
import { SkillService } from '../../services/skill.service';
import { ContactService } from '../../services/contact.service';
import type { DashboardStats } from '../../core/models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <div class="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Overview of your portfolio statistics.</p>
        </div>
      </div>

      @if (error()) {
        <div class="alert alert-error">{{ error() }}</div>
      }

      @if (loading()) {
        <div class="card loading-card">Loading...</div>
      } @else if (stats()) {
        <div class="grid-4">
          <div class="card stat-card">
            <div class="stat-label mono">Total Projects</div>
            <div class="stat-value">{{ stats()!.totalProjects }}</div>
          </div>
          <div class="card stat-card">
            <div class="stat-label mono">Featured</div>
            <div class="stat-value">{{ stats()!.featuredProjects }}</div>
          </div>
          <div class="card stat-card">
            <div class="stat-label mono">Experiences</div>
            <div class="stat-value">{{ stats()!.totalExperiences }}</div>
          </div>
          <div class="card stat-card">
            <div class="stat-label mono">Skills</div>
            <div class="stat-value">{{ stats()!.totalSkills }}</div>
          </div>
          <div class="card stat-card">
            <div class="stat-label mono">Messages</div>
            <div class="stat-value">{{ stats()!.totalMessages }}</div>
          </div>
          <div class="card stat-card new">
            <div class="stat-label mono">New Messages</div>
            <div class="stat-value">{{ stats()!.newMessages }}</div>
          </div>
        </div>

        <div class="dashboard-grid">
          <div class="card section-card">
            <div class="section-head">
              <h3>Recent Messages</h3>
              <a routerLink="/admin/messages" class="link-sm">View all &rarr;</a>
            </div>
            @if (!stats()!.recentMessages?.length) {
              <div class="empty">No messages yet.</div>
            } @else {
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let m of stats()!.recentMessages | slice:0:5">
                    <td>{{ m.name }}</td>
                    <td class="mono">{{ m.email }}</td>
                    <td>{{ m.subject }}</td>
                    <td><span class="badge" [ngClass]="statusClass(m.status)">{{ m.status }}</span></td>
                    <td class="mono">{{ m.createdAt | date:'short' }}</td>
                  </tr>
                </tbody>
              </table>
            }
          </div>

          <div class="card section-card">
            <div class="section-head">
              <h3>Recent Projects</h3>
              <a routerLink="/admin/projects" class="link-sm">Manage &rarr;</a>
            </div>
            @if (!stats()!.recentProjects?.length) {
              <div class="empty">No projects yet.</div>
            } @else {
              <ul class="proj-list">
                <li *ngFor="let p of stats()!.recentProjects" class="proj-item">
                  <div>
                    <div class="proj-title">
                      {{ p.title }}
                      <span *ngIf="p.featured" class="badge badge-accent">&starf;</span>
                    </div>
                    <div class="proj-meta mono">
                      <span>{{ p.category }}</span>
                      <span class="dot">&middot;</span>
                      <span>{{ p.year }}</span>
                    </div>
                  </div>
                  <a [routerLink]="['/admin/projects', p._id, 'edit']" class="btn btn-ghost btn-sm">Edit</a>
                </li>
              </ul>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard { max-width: 1200px; }
    .page-header { margin-bottom: 1.5rem; }
    .page-header h2 { margin: 0 0 .25rem; }
    .page-header p { margin: 0; color: var(--text-muted); font-size: var(--fs-sm); }

    .loading-card { padding: 3rem; text-align: center; color: var(--text-dim); }
    .empty { padding: 2rem; text-align: center; color: var(--text-dim); font-size: var(--fs-sm); }

    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    @media (max-width: 900px) { .grid-4 { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 500px) { .grid-4 { grid-template-columns: 1fr; } }

    .stat-card { padding: 1.25rem; }
    .stat-card.new { border-color: var(--accent); }
    .stat-label { font-size: var(--fs-xs); color: var(--text-dim); text-transform: uppercase; letter-spacing: .05em; margin-bottom: .5rem; }
    .stat-value { font-size: var(--fs-xl); font-weight: 800; color: var(--text); }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }
    @media (max-width: 900px) { .dashboard-grid { grid-template-columns: 1fr; } }

    .section-card { padding: 1.25rem; }
    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .section-head h3 { margin: 0; font-size: var(--fs-md); }
    .link-sm { font-size: var(--fs-xs); color: var(--accent); text-decoration: none; }
    .link-sm:hover { text-decoration: underline; }

    .table {
      width: 100%;
      border-collapse: collapse;
    }
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
    }
    .table tr:last-child td { border-bottom: none; }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 10px;
      font-family: var(--font-mono);
      font-weight: 500;
    }
    .badge-accent { background: var(--gradient-soft); color: var(--accent); }

    .proj-list { list-style: none; padding: 0; margin: 0; }
    .proj-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .75rem 0;
      border-bottom: 1px solid var(--border);
      gap: .75rem;
    }
    .proj-item:last-child { border-bottom: none; }
    .proj-title { font-weight: 600; font-size: var(--fs-sm); }
    .proj-meta { font-size: 10px; color: var(--text-dim); margin-top: 2px; }
    .dot { margin: 0 .25rem; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  stats = signal<DashboardStats | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(
    private dashboardService: DashboardService,
    private projectService: ProjectService,
    private experienceService: ExperienceService,
    private skillService: SkillService,
    private contactService: ContactService,
  ) {}

  ngOnInit() {
    this.dashboardService.getStats().subscribe({
      next: (res) => {
        this.stats.set(res.data || null);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Failed to load dashboard stats.');
        this.loading.set(false);
      },
    });
  }

  statusClass(status?: string): string {
    return status === 'new' ? 'badge-new' : status === 'read' ? 'badge-success' : 'badge-muted';
  }
}
