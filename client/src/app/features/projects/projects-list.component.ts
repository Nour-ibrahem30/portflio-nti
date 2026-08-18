import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { ProjectCardComponent } from '../../shared/project-card.component';
import { LoadingComponent } from '../../shared/loading.component';
import { EmptyComponent } from '../../shared/empty.component';
import { ProjectService } from '../../services/project.service';
import { SkillService } from '../../services/skill.service';
import type { Project } from '../../core/models';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, SectionHeaderComponent, ProjectCardComponent, LoadingComponent, EmptyComponent],
  template: `
    <section class="section" style="padding-top:3rem;">
      <div class="container">
        <app-section-header label="Projects" title="All Projects" num="01" lead="Everything I've built, prototyped, or am actively working on. Filter by category or tech.">
          <span label>Projects</span>
        </app-section-header>

        @if (!loading()) {
          <div class="filters card">
            <div class="search">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 1 0-.7.7l.3.3v.8l5 5 1.5-1.5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14"/></svg>
              <input [formControl]="searchCtrl" type="text" placeholder="Search projects by name, description, or tech..." />
              <button *ngIf="searchCtrl.value" class="clear" (click)="searchCtrl.setValue('')" aria-label="Clear search">×</button>
            </div>

            <div class="filter-row" *ngIf="categories().length">
              <span class="filter-label mono">Category</span>
              <div class="cat-btns">
                <button class="cat-btn" [class.active]="activeCategory() === ''" (click)="activeCategory.set('')">All ({{ all().length }})</button>
                <button *ngFor="let c of categories()" class="cat-btn" [class.active]="activeCategory() === c" (click)="activeCategory.set(c)">{{ c }} ({{ countByCat(c) }})</button>
              </div>
            </div>

            <div class="filter-row" *ngIf="technologies().length">
              <span class="filter-label mono">Technology</span>
              <div class="tech-chips">
                <button class="chip" [class.active]="activeTech() === ''" (click)="activeTech.set('')">All</button>
                <button *ngFor="let t of technologies()" class="chip" [class.active]="activeTech() === t" (click)="toggleTech(t)">{{ t }}</button>
              </div>
            </div>
          </div>
        }

        @if (loading()) {
          <app-loading text="Loading projects from database..." />
        } @else if (filtered().length) {
          <div class="result-count mono">
            Showing {{ filtered().length }} of {{ all().length }} project{{ all().length === 1 ? '' : 's' }}
          </div>
          <div class="grid grid-3">
            <app-project-card *ngFor="let p of filtered(); trackBy: trackId" [project]="p" />
          </div>
        } @else {
          <app-empty icon="🔍" title="No projects match" message="Try clearing the filters or search for something else." />
        }
      </div>
    </section>
  `,
  styles: [`
    .filters {
      margin: 2.5rem 0 2rem;
      padding: 1.5rem;
      display: grid;
      gap: 1.25rem;
    }
    .search {
      position: relative;
      display: flex;
      align-items: center;
      gap: .65rem;
      padding: 0 1rem;
      background: var(--bg-soft);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: all var(--transition);
    }
    .search:focus-within {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(99,102,241,.12);
    }
    .search svg { color: var(--text-dim); flex-shrink: 0; }
    .search input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      padding: .85rem 0;
      color: var(--text);
      font-size: var(--fs-sm);
      font-family: inherit;
    }
    .search .clear {
      background: transparent;
      border: none;
      color: var(--text-dim);
      font-size: 20px;
      cursor: pointer;
      padding: 0 .25rem;
      line-height: 1;
    }
    .search .clear:hover { color: var(--danger); }

    .filter-row {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 1rem;
      align-items: flex-start;
    }
    @media (max-width: 640px) {
      .filter-row { grid-template-columns: 1fr; }
    }
    .filter-label {
      font-size: var(--fs-xxs);
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: .08em;
      padding-top: .5rem;
    }

    .cat-btns, .tech-chips {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
    }
    .cat-btn {
      padding: .5rem 1rem;
      background: var(--bg-soft);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text-muted);
      font-size: var(--fs-sm);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition);
      font-family: inherit;
    }
    .cat-btn:hover { color: var(--text); border-color: var(--accent); }
    .cat-btn.active {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }
    .chip {
      padding: .35rem .75rem;
      background: var(--bg-soft);
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--text-muted);
      font-size: var(--fs-xxs);
      cursor: pointer;
      transition: all var(--transition);
      font-family: inherit;
    }
    .chip:hover { color: var(--text); border-color: var(--accent-2); }
    .chip.active {
      background: var(--gradient-soft);
      color: var(--accent);
      border-color: var(--accent);
    }

    .result-count {
      font-size: var(--fs-xxs);
      color: var(--text-dim);
      margin-bottom: 1.25rem;
      text-transform: uppercase;
      letter-spacing: .05em;
    }
  `]
})
export class ProjectsListComponent implements OnInit {
  loading = signal(true);
  all = signal<Project[]>([]);
  categories = signal<string[]>([]);
  technologies = signal<string[]>([]);

  searchCtrl = new FormControl('');
  activeCategory = signal('');
  activeTech = signal('');

  filtered = computed(() => {
    let list = this.all();
    const q = (this.searchCtrl.value || '').trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.shortDescription || '').toLowerCase().includes(q) ||
        (p.technologies || []).some(t => t.toLowerCase().includes(q))
      );
    }
    if (this.activeCategory()) {
      list = list.filter(p => p.category === this.activeCategory());
    }
    if (this.activeTech()) {
      list = list.filter(p => (p.technologies || []).includes(this.activeTech()));
    }
    return list;
  });

  constructor(private projectService: ProjectService, private skillService: SkillService) {}

  ngOnInit() {
    this.projectService.getAll().subscribe({
      next: (res) => {
        const projects = res.data || [];
        this.all.set(projects);

        const cats = new Set<string>();
        const techs = new Set<string>();
        projects.forEach(p => {
          if (p.category) cats.add(p.category);
          (p.technologies || []).forEach(t => techs.add(t));
        });
        this.categories.set(Array.from(cats).sort());
        this.technologies.set(Array.from(techs).sort());

        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  toggleTech(t: string) {
    this.activeTech.set(this.activeTech() === t ? '' : t);
  }

  countByCat(c: string) {
    return this.all().filter(p => p.category === c).length;
  }

  trackId = (i: number, p: Project) => p._id ?? i;
}
