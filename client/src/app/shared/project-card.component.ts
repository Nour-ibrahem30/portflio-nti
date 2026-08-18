import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import type { Project } from "../core/models";

@Component({
  selector: "app-project-card",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (project) {
      <article class="p-card fade-in">
        <div class="p-head">
          <div class="p-status">
            <span [ngSwitch]="project.status" class="badge">
              <span *ngSwitchCase="'Concept / Prototype'" class="badge-warning">
                <span class="sdot"></span> Concept / Prototype
              </span>
              <span *ngSwitchCase="'In Progress'" class="badge-info">
                <span class="sdot in-progress"></span> In Progress
              </span>
              <span *ngSwitchCase="'Archived'" class="badge-muted">
                <span class="sdot archived"></span> Archived
              </span>
              <span *ngSwitchDefault class="badge-success">
                <span class="sdot done"></span> Project
              </span>
            </span>
            <span *ngIf="project.featured" class="badge badge-accent"
              >★ Featured</span
            >
          </div>
          @if (project.year) {
            <div class="mono year">{{ project.year }}</div>
          }
        </div>

        <h3 class="p-title">
          <a [routerLink]="['/projects', project.slug]">{{ project.title }}</a>
        </h3>

        <p class="p-desc">
          {{
            project.shortDescription ||
              (project.description | slice: 0 : 140) + "..."
          }}
        </p>

        <div class="p-tech" *ngIf="project.technologies?.length">
          <span
            class="tag"
            *ngFor="let t of project.technologies | slice: 0 : 5"
            >{{ t }}</span
          >
        </div>

        <div class="p-foot">
          <a
            [routerLink]="['/projects', project.slug]"
            class="btn btn-sm btn-secondary"
          >
            Details
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                fill="currentColor"
                d="M5 12h11.2l-4.6 4.6 1.4 1.4L20 11l-7-7-1.4 1.4L16.2 10H5z"
              />
            </svg>
          </a>
          <div class="p-links">
            <a
              *ngIf="project.githubUrl"
              [href]="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              class="icon-link"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
                />
              </svg>
            </a>
            <a
              *ngIf="project.liveUrl"
              [href]="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              class="icon-link"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14zm-8 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3h2v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h3v2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </article>
    }
  `,
  styles: [
    `
      .p-card {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        padding: 1.5rem;
      }
      .p-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
      }
      .p-status {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .sdot {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--success);
        margin-right: 2px;
      }
      .sdot.in-progress {
        background: var(--info);
        animation: pulse 1.6s infinite;
      }
      .sdot.archived {
        background: var(--text-dim);
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.35;
        }
      }
      .year {
        font-size: var(--fs-xxs);
        color: var(--text-dim);
      }

      .p-title {
        margin-bottom: 0.5rem;
        font-size: var(--fs-lg);
      }
      .p-title a {
        color: var(--text);
      }
      .p-title a:hover {
        color: var(--accent);
      }
      .p-desc {
        color: var(--text-muted);
        font-size: var(--fs-sm);
        margin-bottom: 1rem;
        flex: 1;
      }
      .p-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-bottom: 1.25rem;
      }

      .p-foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
      }
      .p-links {
        display: flex;
        gap: 0.5rem;
      }
      .icon-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border-radius: var(--radius-sm);
        background: var(--bg-soft);
        border: 1px solid var(--border);
        color: var(--text-muted);
        transition: all var(--transition);
      }
      .icon-link:hover {
        color: var(--accent);
        border-color: var(--accent);
      }
    `,
  ],
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
