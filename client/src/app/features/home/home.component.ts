import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { ProjectCardComponent } from '../../shared/project-card.component';
import { LoadingComponent } from '../../shared/loading.component';
import { EmptyComponent } from '../../shared/empty.component';
import { ProjectService } from '../../services/project.service';
import { ExperienceService } from '../../services/experience.service';
import { SkillService } from '../../services/skill.service';
import type { Project, Experience, Skill } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, ProjectCardComponent, LoadingComponent, EmptyComponent],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="terminal">
          <div class="terminal-bar">
            <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
            <span class="path mono">~/nour/portfolio — zsh</span>
          </div>
          <div class="terminal-body mono">
            <div class="line"><span class="prompt">$</span> whoami</div>
            <div class="output">Nour Ibrahem — Front-End Developer</div>
            <div class="line"><span class="prompt">$</span> cat focus.txt</div>
            <div class="output">
              <div>→ Building interfaces with <hl>HTML / CSS / JS / TS / Angular / React</hl></div>
              <div>→ Exploring <hl>AI · Automation · Cybersecurity · Smart Hardware</hl></div>
              <div>→ Learning the <hl>MEAN Stack</hl> end-to-end for this portfolio</div>
            </div>
            <div class="line"><span class="prompt">$</span> cat status.txt</div>
            <div class="output ok">● Online · Building · Learning · Shipping</div>
            <div class="line"><span class="prompt animate">$</span><span class="cursor">▍</span></div>
          </div>
        </div>

        <div class="hero-copy">
          <div class="intro-badge mono">
            <span class="pulse-dot"></span>
            NTI MEAN Stack Project · v1.0
          </div>
          <h1 class="hero-title">
            I build interfaces,
            <br/>
            <span class="gradient-text">ship real projects,</span>
            <br/>
            and learn everything in between.
          </h1>
          <p class="hero-lead">
            Hey, I'm <strong>Nour Ibrahem</strong> — a Front-End Developer from the HICMIS MIS program (Class of 2026).
            I turn what I learn into real things: web apps, automation scripts, AI concepts, and the occasional hardware prototype.
            This site is my portfolio and my MEAN Stack final project — running on Angular + Express + MongoDB.
          </p>
          <div class="hero-ctas">
            <a routerLink="/projects" class="btn btn-primary btn-lg">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M10 20h4v-2h-4zm2-18a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>
              View My Work
            </a>
            <a routerLink="/about" class="btn btn-secondary btn-lg">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"/></svg>
              About Me
            </a>
            <a routerLink="/contact" class="btn btn-secondary btn-lg">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/></svg>
              Contact Me
            </a>
            <a routerLink="/cv" class="btn btn-ghost btn-lg">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 2 5 5h-5zM8 13h8v2H8zm0 4h8v2H8zm0-8h3v2H8z"/></svg>
              Download CV
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <div class="num">{{ featuredProjects.length || '—' }}</div>
              <div class="label mono">featured projects</div>
            </div>
            <div class="stat">
              <div class="num">{{ totalSkills || '—' }}</div>
              <div class="label mono">tech / tools</div>
            </div>
            <div class="stat">
              <div class="num">{{ totalExperience || '—' }}</div>
              <div class="label mono">experiences</div>
            </div>
            <div class="stat">
              <div class="num">Learn→Build→Ship</div>
              <div class="label mono">my loop</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUICK JOURNEY STRIP -->
    <section class="quick-strip">
      <div class="container">
        <div class="q-grid">
          <div class="q-card">
            <div class="q-num mono">01</div>
            <h4>Learn</h4>
            <p>Frontend fundamentals, MEAN stack, AI concepts, security, embedded systems.</p>
          </div>
          <div class="q-card">
            <div class="q-num mono">02</div>
            <h4>Build</h4>
            <p>Actual working projects — not tutorials. Laser automation, AI concepts, dashboards.</p>
          </div>
          <div class="q-card">
            <div class="q-num mono">03</div>
            <h4>Ship</h4>
            <p>This portfolio is live proof of the stack: Angular ↔ Express ↔ Node ↔ MongoDB.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED PROJECTS -->
    <section class="section">
      <div class="container">
        <app-section-header label="Selected Work" title="Featured Projects" lead="A few projects I'm building or exploring. Each one is a real direction — not a placeholder." num="01">
          <span label>Selected Work</span>
        </app-section-header>

        @if (loadingProjects()) {
          <app-loading text="Loading projects from MongoDB..." />
        } @else if (featuredProjects().length) {
          <div class="grid grid-3">
            <app-project-card *ngFor="let p of featuredProjects()" [project]="p" />
          </div>
          <div style="text-align:center;margin-top:3rem;">
            <a routerLink="/projects" class="btn btn-secondary">
              View All Projects
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M5 12h11.2l-4.6 4.6 1.4 1.4L20 11l-7-7-1.4 1.4L16.2 10H5z"/></svg>
            </a>
          </div>
        } @else {
          <app-empty icon="🛠️" title="No projects yet" message="Seed the database with `npm run seed` in the server directory to load sample projects." link="/projects" linkText="Go to Projects" />
        }
      </div>
    </section>

    <!-- WHAT I'M UP TO (Skills + Learning) -->
    <section class="section">
      <div class="container">
        <app-section-header label="Currently" title="Stack + Interests" lead="What I work with, and what I'm digging into right now." num="02">
          <span label>Currently</span>
        </app-section-header>

        <div class="grid grid-3 stack-grid">
          <div class="stack-col">
            <div class="stack-head">
              <div class="dot known"></div><span class="mono label">Known</span>
            </div>
            <div class="chips">
              <span class="tag" *ngFor="let s of knownSkills()">{{ s.name }}</span>
            </div>
          </div>
          <div class="stack-col">
            <div class="stack-head">
              <div class="dot learning"></div><span class="mono label">Learning</span>
            </div>
            <div class="chips">
              <span class="tag" *ngFor="let s of learningSkills()">{{ s.name }}</span>
            </div>
          </div>
          <div class="stack-col">
            <div class="stack-head">
              <div class="dot exploring"></div><span class="mono label">Exploring</span>
            </div>
            <div class="chips">
              <span class="tag" *ngFor="let s of exploringSkills()">{{ s.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LATEST EXPERIENCE -->
    <section class="section">
      <div class="container">
        <app-section-header label="Journey" title="Latest Experience" lead="Internships, training, community work — a quick look." num="03">
          <span label>Journey</span>
        </app-section-header>

        <div class="exp-mini">
          @if (loadingExp()) {
            <app-loading size="22" text="Loading experience..." />
          } @else {
            <div class="timeline">
              <div class="tl-item fade-in" *ngFor="let e of latestExperience(); trackBy: trackId">
                <div class="tl-dot" [ngClass]="e.type?.toLowerCase()"></div>
                <div class="tl-card card">
                  <div class="tl-meta">
                    <span class="badge badge-accent">{{ e.type }}</span>
                    <span class="mono date">{{ e.dateLabel }}</span>
                  </div>
                  <h4>{{ e.position }}</h4>
                  <div class="org">{{ e.organization }}</div>
                </div>
              </div>
            </div>
            <div style="text-align:center;margin-top:2rem;">
              <a routerLink="/experience" class="btn btn-secondary">See Full Timeline</a>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-card card">
          <h2>Have a project, an idea, or just want to say hi?</h2>
          <p>I'm always happy to talk about frontend, AI, automation, security, or weird hardware ideas. (And yes, the contact form actually saves messages to MongoDB.)</p>
          <div class="cta-actions">
            <a routerLink="/contact" class="btn btn-primary btn-lg">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/></svg>
              Send a Message
            </a>
            <a routerLink="/projects" class="btn btn-ghost btn-lg">Browse projects →</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero { padding: clamp(3rem, 8vw, 6rem) 0 3rem; }
    .hero-inner { display: grid; grid-template-columns: 1.05fr 1fr; gap: 3rem; align-items: center; }
    @media (max-width: 900px) { .hero-inner { grid-template-columns: 1fr; } }

    .intro-badge { display: inline-flex; align-items: center; gap: .5rem; padding: .35rem .75rem; border-radius: 999px; background: var(--gradient-soft); border: 1px solid var(--border); font-size: var(--fs-xxs); color: var(--accent); margin-bottom: 1.5rem; }
    .pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--success); box-shadow: 0 0 10px var(--success); animation: pulse 1.8s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }

    .hero-title { margin-bottom: 1.25rem; }
    .gradient-text { background: var(--gradient); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .hero-lead { font-size: var(--fs-md); max-width: 56ch; color: var(--text-muted); margin-bottom: 2rem; }
    .hero-lead strong { color: var(--text); }
    .hero-ctas { display: flex; flex-wrap: wrap; gap: .75rem; margin-bottom: 2.5rem; }

    .hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
    @media (max-width: 640px) { .hero-stats { grid-template-columns: repeat(2, 1fr); } }
    .stat .num { font-weight: 800; font-size: var(--fs-lg); color: var(--text); }
    .stat .label { font-size: 10px; color: var(--text-dim); text-transform: uppercase; letter-spacing: .08em; }

    .terminal {
      border-radius: var(--radius-lg);
      background: var(--bg-elev);
      border: 1px solid var(--border-strong);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      transform: perspective(1200px) rotateX(4deg) rotateY(-4deg);
      transition: transform var(--transition-slow);
    }
    .terminal:hover { transform: perspective(1200px) rotateX(0) rotateY(0); }
    .terminal-bar .path { margin-left: 1rem; }
    .terminal-body { padding: 1.25rem 1.25rem 1.5rem; font-size: var(--fs-sm); line-height: 1.8; color: var(--text-muted); overflow-x: auto; }
    .line { display: flex; align-items: center; margin-top: .5rem; }
    .prompt { color: var(--accent); font-weight: 600; margin-right: .5rem; display: inline-block; min-width: 14px; }
    .prompt.animate { animation: blinkLine 4s steps(1) infinite; }
    @keyframes blinkLine {
      0%,25% { opacity: 1; }
      26%,50% { opacity: 0; }
      51%,75% { opacity: 1; }
      76%,100% { opacity: 0; }
    }
    .cursor { color: var(--accent-2); margin-left: 2px; animation: blink 1s steps(1) infinite; display: inline-block; }
    @keyframes blink { 50% { opacity: 0; } }
    .output { padding-left: 1.25rem; margin-bottom: .3rem; color: var(--text); }
    .output.ok { color: var(--success); }
    hl { background: var(--gradient-soft); color: var(--accent); padding: 1px 6px; border-radius: 4px; font-weight: 500; border: 1px solid var(--border); }

    .quick-strip { padding: 3rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .q-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
    @media (max-width: 800px) { .q-grid { grid-template-columns: 1fr; } }
    .q-card { padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border); background: var(--bg-soft); }
    .q-num { font-size: var(--fs-xs); color: var(--accent); margin-bottom: .5rem; }
    .q-card h4 { font-size: var(--fs-md); margin-bottom: .35rem; }
    .q-card p { margin: 0; font-size: var(--fs-sm); }

    .stack-grid { align-items: stretch; }
    .stack-col { padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border); background: var(--bg-card); backdrop-filter: blur(10px); display: flex; flex-direction: column; gap: 1rem; min-height: 240px; }
    .stack-head { display: inline-flex; align-items: center; gap: .5rem; }
    .stack-head .dot { width: 10px; height: 10px; border-radius: 50%; }
    .stack-head .dot.known { background: var(--success); box-shadow: 0 0 10px var(--success); }
    .stack-head .dot.learning { background: var(--info); box-shadow: 0 0 10px var(--info); }
    .stack-head .dot.exploring { background: var(--accent-3); box-shadow: 0 0 10px var(--accent-3); }
    .stack-head .label { font-size: var(--fs-xs); color: var(--text-muted); }
    .chips { display: flex; flex-wrap: wrap; gap: .4rem; }

    .timeline { position: relative; padding-left: 2rem; }
    .timeline::before { content: ''; position: absolute; left: 7px; top: 0; bottom: 0; width: 2px; background: var(--border); }
    .tl-item { position: relative; padding-bottom: 1.5rem; }
    .tl-dot { position: absolute; left: -2rem; top: 1.2rem; width: 16px; height: 16px; border-radius: 50%; background: var(--bg); border: 2px solid var(--accent); box-shadow: 0 0 0 4px var(--bg); }
    .tl-dot.internship { border-color: var(--info); }
    .tl-dot.training { border-color: var(--accent-2); }
    .tl-dot.volunteer { border-color: var(--accent-3); }
    .tl-dot.community { border-color: var(--success); }
    .tl-dot.work { border-color: var(--warning); }
    .tl-meta { display: flex; align-items: center; justify-content: space-between; gap: .75rem; margin-bottom: .5rem; flex-wrap: wrap; }
    .tl-meta .date { font-size: var(--fs-xxs); color: var(--text-dim); }
    .tl-card h4 { margin-bottom: .25rem; font-size: var(--fs-base); }
    .tl-card .org { color: var(--text-muted); font-size: var(--fs-sm); }

    .cta-card { text-align: center; padding: clamp(2rem, 6vw, 3.5rem); background: var(--gradient-soft); border-color: var(--border-strong); }
    .cta-card h2 { margin-bottom: .5rem; background: var(--gradient); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .cta-card p { max-width: 60ch; margin: 0 auto 2rem; font-size: var(--fs-md); }
    .cta-actions { display: flex; gap: .75rem; flex-wrap: wrap; justify-content: center; }
  `]
})
export class HomeComponent implements OnInit {
  featuredProjects = signal<Project[]>([]);
  latestExperience = signal<Experience[]>([]);
  knownSkills = signal<Skill[]>([]);
  learningSkills = signal<Skill[]>([]);
  exploringSkills = signal<Skill[]>([]);
  loadingProjects = signal(true);
  loadingExp = signal(true);
  totalSkills = 0;
  totalExperience = 0;

  constructor(
    private projectService: ProjectService,
    private experienceService: ExperienceService,
    private skillService: SkillService
  ) {}

  ngOnInit() {
    this.projectService.getAll({ featured: true }).subscribe({
      next: (res) => {
        this.featuredProjects.set(res.data || []);
        this.loadingProjects.set(false);
      },
      error: () => this.loadingProjects.set(false)
    });

    this.experienceService.getAll().subscribe({
      next: (res) => {
        const all = res.data || [];
        this.totalExperience = all.length;
        this.latestExperience.set(all.slice(0, 4));
        this.loadingExp.set(false);
      },
      error: () => this.loadingExp.set(false)
    });

    this.skillService.getAll().subscribe({
      next: (res) => {
        const all = res.data || [];
        this.totalSkills = all.length;
        this.knownSkills.set(all.filter(s => s.proficiency === 'Known').slice(0, 10));
        this.learningSkills.set(all.filter(s => s.proficiency === 'Learning'));
        this.exploringSkills.set(all.filter(s => s.proficiency === 'Exploring' || s.category === 'Exploring'));
      },
      error: () => {}
    });
  }

  trackId = (i: number, e: Experience) => e._id;
}
