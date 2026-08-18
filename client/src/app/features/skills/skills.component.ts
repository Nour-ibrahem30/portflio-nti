import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { LoadingComponent } from '../../shared/loading.component';
import { EmptyComponent } from '../../shared/empty.component';
import { SkillService } from '../../services/skill.service';
import type { Skill } from '../../core/models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, LoadingComponent, EmptyComponent],
  template: `
    <section class="section" style="padding-top:3rem;">
      <div class="container">
        <app-section-header label="Skills" title="Tech Stack & Tools" num="01" lead="What I work with, what I'm learning, and what I'm curious about exploring.">
          <span label>Skills</span>
        </app-section-header>

        @if (loading()) {
          <app-loading text="Loading skills..." />
        } @else if (hasAny()) {
          <div class="skills-grid">
            <div class="card skill-group fade-in" *ngIf="frontend().length">
              <div class="group-head">
                <div class="group-ic fe"><svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M3 3h18v18H3zm2 2v14h14V5zm2.5 3h9v2h-4l.5 5h-2l-.5-5h-3z"/></svg></div>
                <h3>Frontend</h3>
                <span class="mono count">{{ frontend().length }}</span>
              </div>
              <ul class="skill-list">
                <li *ngFor="let s of frontend()">
                  <span class="s-name">{{ s.name }}</span>
                  <span class="badge" [ngClass]="badgeClass(s.proficiency)">{{ s.proficiency }}</span>
                </li>
              </ul>
            </div>

            <div class="card skill-group fade-in" *ngIf="backend().length">
              <div class="group-head">
                <div class="group-ic be"><svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M4 4h16v6H4zm0 8h16v6H4zm2-6v2h12V6zm0 8v2h12v-2z"/></svg></div>
                <h3>Backend</h3>
                <span class="mono count">{{ backend().length }}</span>
              </div>
              <ul class="skill-list">
                <li *ngFor="let s of backend()">
                  <span class="s-name">{{ s.name }}</span>
                  <span class="badge" [ngClass]="badgeClass(s.proficiency)">{{ s.proficiency }}</span>
                </li>
              </ul>
            </div>

            <div class="card skill-group fade-in" *ngIf="tools().length">
              <div class="group-head">
                <div class="group-ic to"><svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg></div>
                <h3>Tools</h3>
                <span class="mono count">{{ tools().length }}</span>
              </div>
              <ul class="skill-list">
                <li *ngFor="let s of tools()">
                  <span class="s-name">{{ s.name }}</span>
                  <span class="badge" [ngClass]="badgeClass(s.proficiency)">{{ s.proficiency }}</span>
                </li>
              </ul>
            </div>

            <div class="card skill-group fade-in" *ngIf="exploring().length">
              <div class="group-head">
                <div class="group-ic ex"><svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m3.5 6.5-2.5 6-6 2.5 2.5-6z"/></svg></div>
                <h3>Exploring</h3>
                <span class="mono count">{{ exploring().length }}</span>
              </div>
              <ul class="skill-list">
                <li *ngFor="let s of exploring()">
                  <span class="s-name">{{ s.name }}</span>
                  <span class="badge" [ngClass]="badgeClass(s.proficiency)">{{ s.proficiency }}</span>
                </li>
              </ul>
            </div>
          </div>
        } @else {
          <app-empty icon="🧠" title="No skills loaded" message="Skills will appear here once the database is seeded." />
        }
      </div>
    </section>
  `,
  styles: [`
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-top: 3rem;
    }
    @media (max-width: 800px) { .skills-grid { grid-template-columns: 1fr; } }

    .skill-group { padding: 1.75rem; display: flex; flex-direction: column; gap: 1rem; }
    .group-head {
      display: flex;
      align-items: center;
      gap: .75rem;
      padding-bottom: 1rem;
      border-bottom: 1px dashed var(--border);
    }
    .group-head h3 { margin: 0; flex: 1; }
    .group-head .count { color: var(--text-dim); font-size: var(--fs-xxs); }
    .group-ic {
      width: 40px; height: 40px;
      border-radius: var(--radius);
      display: inline-flex; align-items: center; justify-content: center;
      color: #fff;
    }
    .group-ic.fe { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
    .group-ic.be { background: linear-gradient(135deg, #10b981, #059669); }
    .group-ic.to { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .group-ic.ex { background: linear-gradient(135deg, #22d3ee, #0ea5e9); }

    .skill-list { list-style: none; padding: 0; margin: 0; display: grid; gap: .5rem; }
    .skill-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .55rem .75rem;
      border-radius: var(--radius-sm);
      background: var(--bg-soft);
      transition: all var(--transition);
    }
    .skill-list li:hover { background: var(--bg-elev); transform: translateX(2px); }
    .s-name { font-weight: 500; font-size: var(--fs-sm); }
  `]
})
export class SkillsComponent implements OnInit {
  loading = signal(true);
  frontend = signal<Skill[]>([]);
  backend = signal<Skill[]>([]);
  tools = signal<Skill[]>([]);
  exploring = signal<Skill[]>([]);

  constructor(private skillService: SkillService) {}

  ngOnInit() {
    this.skillService.getAll().subscribe({
      next: (res) => {
        const all = res.data || [];
        this.frontend.set(all.filter(s => s.category === 'Frontend'));
        this.backend.set(all.filter(s => s.category === 'Backend'));
        this.tools.set(all.filter(s => s.category === 'Tools'));
        this.exploring.set(all.filter(s => s.category === 'Exploring'));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  hasAny = () => this.frontend().length || this.backend().length || this.tools().length || this.exploring().length;

  badgeClass(proficiency?: string) {
    switch (proficiency) {
      case 'Known': return 'badge-success';
      case 'Learning': return 'badge-info';
      case 'Exploring': return 'badge-warning';
      default: return 'badge-muted';
    }
  }
}
