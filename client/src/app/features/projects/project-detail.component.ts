import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { LoadingComponent } from '../../shared/loading.component';
import { EmptyComponent } from '../../shared/empty.component';
import { ProjectService } from '../../services/project.service';
import type { Project } from '../../core/models';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LoadingComponent, EmptyComponent],
  template: `
    <section class="section" style="padding-top:3rem;">
      <div class="container">
        <a routerLink="/projects" class="back-link mono">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M20 11H7.8l5.6-5.6-1.4-1.4L4 12l8 8 1.4-1.4L7.8 13H20z"/></svg>
          Back to projects
        </a>

        @if (loading()) {
          <app-loading text="Loading project details..." />
        } @else if (project()) {
          <div class="detail-wrap">
            <div class="detail-head card fade-in">
              <div class="head-row">
                <div class="badges">
                  <span class="badge" [ngClass]="statusBadge(project()!.status)">
                    <span class="sdot" [ngClass]="statusDot(project()!.status)"></span>
                    {{ project()!.status || 'Project' }}
                  </span>
                  <span *ngIf="project()!.featured" class="badge badge-accent">★ Featured</span>
                  <span *ngIf="project()!.category" class="badge badge-secondary">{{ project()!.category }}</span>
                </div>
                <div *ngIf="project()!.year" class="mono year">{{ project()!.year }}</div>
              </div>

              <h1 class="title">{{ project()!.title }}</h1>
              <p *ngIf="project()!.shortDescription" class="short-desc">{{ project()!.shortDescription }}</p>

              <div class="actions">
                <a *ngIf="project()!.githubUrl" [href]="project()!.githubUrl" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>
                  View on GitHub
                </a>
                <a *ngIf="project()!.liveUrl" [href]="project()!.liveUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14zm-8 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3h2v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h3v2z"/></svg>
                  Live Demo
                </a>
              </div>
            </div>

            <div class="detail-body">
              <div class="main-col">
                <div class="card fade-in" *ngIf="project()!.gallery?.length">
                  <div class="section-label mono">Gallery</div>
                  <div class="gallery">
                    <img *ngFor="let img of project()!.gallery; let i = index" [src]="img" [alt]="project()!.title + ' screenshot ' + (i+1)" loading="lazy" />
                  </div>
                </div>

                <div class="card fade-in" *ngIf="project()!.description">
                  <div class="section-label mono">About this project</div>
                  <div class="desc" [innerHTML]="project()!.description"></div>
                </div>
              </div>

              <aside class="side-col">
                <div class="card fade-in" *ngIf="project()!.technologies?.length">
                  <div class="section-label mono">Technologies</div>
                  <div class="tech-stack">
                    <span class="tag" *ngFor="let t of project()!.technologies">{{ t }}</span>
                  </div>
                </div>

                <div class="card fade-in meta-card">
                  <div class="section-label mono">Quick Info</div>
                  <ul class="meta-list">
                    <li *ngIf="project()!.category">
                      <span>Category</span>
                      <strong>{{ project()!.category }}</strong>
                    </li>
                    <li *ngIf="project()!.year">
                      <span>Year</span>
                      <strong>{{ project()!.year }}</strong>
                    </li>
                    <li>
                      <span>Status</span>
                      <strong>{{ project()!.status || 'Project' }}</strong>
                    </li>
                    <li>
                      <span>Featured</span>
                      <strong>{{ project()!.featured ? 'Yes' : 'No' }}</strong>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        } @else {
          <app-empty icon="❓" title="Project not found" message="This project may have been removed or the link is invalid." link="/projects" linkText="Back to Projects" />
        }
      </div>
    </section>
  `,
  styles: [`
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: .4rem;
      color: var(--text-dim);
      text-decoration: none;
      font-size: var(--fs-xxs);
      margin-bottom: 2rem;
      transition: color var(--transition);
    }
    .back-link:hover { color: var(--accent); }

    .detail-wrap { display: grid; gap: 1.5rem; }

    .detail-head {
      padding: 2rem;
      background: var(--gradient-soft);
      border-color: var(--border-strong);
    }
    .head-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 1.25rem;
    }
    .badges { display: flex; flex-wrap: wrap; gap: .4rem; }
    .sdot {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      margin-right: 3px;
      background: var(--success);
    }
    .sdot.in-progress { background: var(--info); animation: pulse 1.6s infinite; }
    .sdot.archived { background: var(--text-dim); }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
    .year { color: var(--text-dim); font-size: var(--fs-xxs); }

    .title {
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      margin-bottom: .75rem;
      line-height: 1.2;
    }
    .short-desc {
      color: var(--text-muted);
      font-size: var(--fs-md);
      max-width: 70ch;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    .actions { display: flex; flex-wrap: wrap; gap: .75rem; }

    .detail-body {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: 1.5rem;
      align-items: start;
    }
    @media (max-width: 900px) { .detail-body { grid-template-columns: 1fr; } }

    .main-col, .side-col { display: grid; gap: 1.5rem; }
    .card { padding: 1.75rem; }
    .section-label {
      font-size: var(--fs-xxs);
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: .1em;
      margin-bottom: 1rem;
    }

    .gallery {
      display: grid;
      gap: 1rem;
    }
    .gallery img {
      width: 100%;
      height: auto;
      border-radius: var(--radius);
      border: 1px solid var(--border);
    }

    .desc {
      font-size: var(--fs-base);
      line-height: 1.7;
      color: var(--text-muted);
    }
    .desc :deep(p) { margin-bottom: 1rem; }
    .desc :deep(strong) { color: var(--text); }
    .desc :deep(code) {
      background: var(--bg-soft);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: var(--fs-sm);
      border: 1px solid var(--border);
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: .4rem;
    }

    .meta-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: .65rem;
    }
    .meta-list li {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      padding: .5rem 0;
      border-bottom: 1px dashed var(--border);
      font-size: var(--fs-sm);
    }
    .meta-list li:last-child { border: none; padding-bottom: 0; }
    .meta-list li:first-child { padding-top: 0; }
    .meta-list span {
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-size: var(--fs-xxs);
      text-transform: uppercase;
      letter-spacing: .05em;
    }
    .meta-list strong { color: var(--text); }
  `]
})
export class ProjectDetailComponent implements OnInit {
  loading = signal(true);
  project = signal<Project | null>(null);

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.projectService.getBySlug(slug).subscribe({
        next: (res) => {
          this.project.set(res.data || null);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    } else {
      this.loading.set(false);
    }
  }

  statusBadge(status?: string) {
    switch (status) {
      case 'Concept / Prototype': return 'badge-warning';
      case 'In Progress': return 'badge-info';
      case 'Archived': return 'badge-muted';
      default: return 'badge-success';
    }
  }

  statusDot(status?: string) {
    switch (status) {
      case 'In Progress': return 'in-progress';
      case 'Archived': return 'archived';
      default: return '';
    }
  }
}
