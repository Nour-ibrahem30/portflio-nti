import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { LoadingComponent } from '../../shared/loading.component';
import { EmptyComponent } from '../../shared/empty.component';
import { ExperienceService } from '../../services/experience.service';
import type { Experience } from '../../core/models';

const FILTER_TABS = ['All', 'Internship', 'Training', 'Volunteer', 'Community', 'Work'] as const;

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, LoadingComponent, EmptyComponent],
  template: `
    <section class="section" style="padding-top:3rem;">
      <div class="container">
        <app-section-header label="Experience" title="Timeline & Journey" num="01" lead="Internships, training, community work, and everything in between that shaped my path.">
          <span label>Experience</span>
        </app-section-header>

        <div class="tabs" *ngIf="!loading()">
          <button
            *ngFor="let tab of FILTER_TABS"
            class="tab"
            [class.active]="activeFilter() === tab"
            (click)="activeFilter.set(tab)"
          >
            {{ tab }}
            <span class="mono count" *ngIf="tab === 'All'">{{ all().length }}</span>
            <span class="mono count" *ngIf="tab !== 'All'">{{ countByType(tab) }}</span>
          </button>
        </div>

        @if (loading()) {
          <app-loading text="Loading experience..." />
        } @else if (filtered().length) {
          <div class="timeline">
            <div class="tl-item fade-in" *ngFor="let e of filtered(); trackBy: trackId">
              <div class="tl-dot" [ngClass]="typeClass(e.type)"></div>
              <div class="tl-card card">
                <div class="tl-meta">
                  <div class="badges">
                    <span class="badge" [ngClass]="badgeClass(e.type)">{{ e.type || 'Experience' }}</span>
                  </div>
                  <span class="mono date">{{ e.dateLabel || (e.startDate ? (e.startDate + (e.endDate ? ' → ' + e.endDate : '')) : '') }}</span>
                </div>
                <h3 class="pos">{{ e.position }}</h3>
                <div class="org">{{ e.organization }}</div>
                <p *ngIf="e.description" class="desc">{{ e.description }}</p>
                <div class="techs" *ngIf="e.technologies?.length">
                  <span class="tag" *ngFor="let t of e.technologies">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>
        } @else {
          <app-empty icon="📋" title="Nothing here yet" message="No experience entries match this filter yet." />
        }
      </div>
    </section>
  `,
  styles: [`
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
      margin: 2.5rem 0 3rem;
      padding: .5rem;
      background: var(--bg-soft);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
    }
    .tab {
      flex: 1;
      min-width: 110px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: .4rem;
      padding: .6rem 1rem;
      border: none;
      background: transparent;
      color: var(--text-muted);
      border-radius: var(--radius);
      cursor: pointer;
      font-size: var(--fs-sm);
      font-weight: 500;
      transition: all var(--transition);
    }
    .tab:hover { color: var(--text); background: var(--bg-elev); }
    .tab.active {
      background: var(--accent);
      color: #fff;
      box-shadow: 0 4px 12px rgba(99,102,241,.25);
    }
    .tab .count { font-size: 10px; opacity: .7; }

    .timeline {
      position: relative;
      padding-left: 2.5rem;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 11px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, var(--accent), var(--border));
      border-radius: 2px;
    }
    .tl-item {
      position: relative;
      padding-bottom: 2rem;
    }
    .tl-item:last-child { padding-bottom: 0; }
    .tl-dot {
      position: absolute;
      left: -2.5rem;
      top: 1.4rem;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--bg);
      border: 3px solid var(--accent);
      box-shadow: 0 0 0 4px var(--bg);
    }
    .tl-dot.internship { border-color: var(--info); }
    .tl-dot.training { border-color: var(--accent-2); }
    .tl-dot.volunteer { border-color: var(--accent-3); }
    .tl-dot.community { border-color: var(--success); }
    .tl-dot.work { border-color: var(--warning); }

    .tl-card { padding: 1.5rem 1.75rem; }
    .tl-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: .75rem;
    }
    .tl-meta .date { font-size: var(--fs-xxs); color: var(--text-dim); }
    .badges { display: flex; gap: .35rem; flex-wrap: wrap; }
    .pos { margin-bottom: .25rem; font-size: var(--fs-base); }
    .org {
      color: var(--accent);
      font-weight: 500;
      font-size: var(--fs-sm);
      margin-bottom: .75rem;
    }
    .desc {
      color: var(--text-muted);
      font-size: var(--fs-sm);
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    .techs {
      display: flex;
      flex-wrap: wrap;
      gap: .35rem;
    }

    @media (max-width: 640px) {
      .timeline { padding-left: 1.75rem; }
      .timeline::before { left: 7px; }
      .tl-dot { left: -1.75rem; top: 1.2rem; width: 18px; height: 18px; box-shadow: 0 0 0 3px var(--bg); }
    }
  `]
})
export class ExperienceComponent implements OnInit {
  readonly FILTER_TABS = FILTER_TABS;
  loading = signal(true);
  all = signal<Experience[]>([]);
  activeFilter = signal<(typeof FILTER_TABS)[number]>('All');

  filtered = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') return this.all();
    return this.all().filter(e => e.type === filter);
  });

  constructor(private experienceService: ExperienceService) {}

  ngOnInit() {
    this.experienceService.getAll().subscribe({
      next: (res) => {
        this.all.set(res.data || []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  countByType(type: string) {
    return this.all().filter(e => e.type === type).length;
  }

  typeClass(type?: string) {
    return (type || 'experience').toLowerCase();
  }

  badgeClass(type?: string) {
    switch (type) {
      case 'Internship': return 'badge-info';
      case 'Training': return 'badge-accent';
      case 'Volunteer': return 'badge-warning';
      case 'Community': return 'badge-success';
      case 'Work': return 'badge-secondary';
      default: return 'badge-muted';
    }
  }

  trackId = (i: number, e: Experience) => e._id ?? i;
}
