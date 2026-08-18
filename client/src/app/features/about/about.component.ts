import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { LoadingComponent } from '../../shared/loading.component';
import { EducationService } from '../../services/education.service';
import { ExperienceService } from '../../services/experience.service';
import type { Education, Experience } from '../../core/models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LoadingComponent],
  template: `
    <section class="section" style="padding-top:3rem;">
      <div class="container">
        <app-section-header label="About Me" title="Who I Am" num="01" lead="I'm a Front-End Developer in the making — turning curiosity into code since I started building real things.">
          <span label>About Me</span>
        </app-section-header>

        <div class="about-grid">
          <div class="about-copy">
            <p>
              I'm <strong>Nour Ibrahem Mohamed</strong> — a student at the
              <strong>Higher Institute of Computer Science and Management Information Systems (HICMIS)</strong>,
              working toward a Bachelor's in Management Information Systems, expected 2026.
            </p>
            <p>
              I like building things that actually exist — clean web interfaces, scripts that automate annoying work,
              concepts that mix AI with developer tooling, and (when the soldering iron is out) the occasional hardware idea.
              I'm most interested in the spaces where <span class="hl">frontend meets AI, automation, and security</span>.
            </p>
            <p>
              Instead of the typical <em>"learn → tutorial → next tutorial"</em> loop, I try to follow this loop instead:
            </p>
            <div class="loop card">
              <div class="loop-step"><span class="num">01</span><span class="label">Learn</span><span class="desc">Pick up something new — a framework, a protocol, a concept.</span></div>
              <div class="loop-arrow"></div>
              <div class="loop-step"><span class="num">02</span><span class="label">Build</span><span class="desc">Make a real project, no matter how small.</span></div>
              <div class="loop-arrow"></div>
              <div class="loop-step"><span class="num">03</span><span class="label">Break / Fix</span><span class="desc">Debug. Refactor. Understand why it broke.</span></div>
              <div class="loop-arrow"></div>
              <div class="loop-step"><span class="num">04</span><span class="label">Improve</span><span class="desc">Make it cleaner, faster, more usable.</span></div>
              <div class="loop-arrow"></div>
              <div class="loop-step"><span class="num">05</span><span class="label">Ship</span><span class="desc">Put it somewhere real and share the link.</span></div>
            </div>
            <p>
              This portfolio itself is exactly that process, running on the <strong>MEAN Stack</strong>:
              MongoDB stores the content, Express + Node serve a REST API with JWT auth, and Angular is the UI you're looking at.
              Everything you see in the projects section is editable from the admin dashboard.
            </p>

            <div class="areas">
              <h4>Areas I'm actively curious about:</h4>
              <ul>
                <li><span class="area-dot ai"></span><strong>AI</strong> — LLMs, embeddings, AI-assisted dev tools (like Escema).</li>
                <li><span class="area-dot auto"></span><strong>Automation</strong> — Python scripts, image processing, laser automation.</li>
                <li><span class="area-dot sec"></span><strong>Cybersecurity</strong> — HTTP/TLS basics, web security, penetration testing concepts.</li>
                <li><span class="area-dot hw"></span><strong>Hardware / Embedded</strong> — Smart glasses concepts, sensors, PCB thinking.</li>
                <li><span class="area-dot fe"></span><strong>Modern Frontend</strong> — Angular, React, TypeScript, performance, accessibility.</li>
              </ul>
            </div>
          </div>

          <aside class="about-side">
            <div class="card profile-card">
              <div class="profile-head">
                <div class="avatar">
                  <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
                    <defs>
                      <linearGradient id="ab" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#6366f1"/>
                        <stop offset="50%" stop-color="#a855f7"/>
                        <stop offset="100%" stop-color="#22d3ee"/>
                      </linearGradient>
                    </defs>
                    <rect width="120" height="120" rx="28" fill="url(#ab)"/>
                    <text x="60" y="76" font-family="ui-monospace,monospace" font-size="52" font-weight="700" fill="#fff" text-anchor="middle">N</text>
                  </svg>
                </div>
                <div class="p-info">
                  <h3>Nour Ibrahem</h3>
                  <div class="p-role">Front-End Developer</div>
                  <div class="p-loc mono">📍 HICMIS · MIS · Class of 2026</div>
                </div>
              </div>
              <div class="p-actions">
                <a routerLink="/projects" class="btn btn-primary btn-block btn-sm">View Projects</a>
                <a routerLink="/contact" class="btn btn-secondary btn-block btn-sm">Contact Me</a>
                <a routerLink="/cv" class="btn btn-ghost btn-block btn-sm">Download CV</a>
              </div>
            </div>

            <div class="card">
              <div class="s-head mono">Quick Facts</div>
              <ul class="facts">
                <li><span>Name</span><strong>Nour Ibrahem Mohamed</strong></li>
                <li><span>Role</span><strong>Front-End Developer</strong></li>
                <li><span>Direction</span><strong>Front-End / Full-Stack</strong></li>
                <li><span>Institution</span><strong>HICMIS</strong></li>
                <li><span>Degree</span><strong>B.Sc. Management Info. Systems</strong></li>
                <li><span>Expected Grad.</span><strong>2026</strong></li>
                <li><span>GPA</span><strong>≈ 3.0–3.04</strong></li>
                <li><span>Class Rank</span><strong>≈ 9th</strong></li>
              </ul>
            </div>
          </aside>
        </div>

        <!-- EDUCATION -->
        <div style="margin-top:6rem;">
          <app-section-header label="Education" title="Education" num="02" lead="Where I'm studying, and what I'm taking away from it.">
            <span label>Education</span>
          </app-section-header>

          @if (loadingEdu()) {
            <app-loading text="Loading education..." />
          } @else if (education().length) {
            <div class="edu-list">
              <div class="edu-card card fade-in" *ngFor="let e of education()">
                <div class="edu-head">
                  <div class="edu-ic">
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 3 1 9l11 6 9-4.91V17h2V9zM5 13.18v4L12 21l7-3.82v-4L12 17z"/></svg>
                  </div>
                  <div>
                    <h3 style="margin-bottom:.2rem;">{{ e.degree }} <span *ngIf="e.field">— {{ e.field }}</span></h3>
                    <div class="mono org">{{ e.institution }}</div>
                  </div>
                  <div class="edu-year mono">{{ e.startYear }} → {{ e.expectedGraduation || e.endYear || 'Present' }}</div>
                </div>
                <p *ngIf="e.description">{{ e.description }}</p>
                <div class="edu-facts">
                  <div *ngIf="e.expectedGraduation" class="badge badge-info">Expected Graduation: {{ e.expectedGraduation }}</div>
                  <div *ngIf="e.gpa" class="badge badge-accent">GPA: {{ e.gpa }}</div>
                  <div *ngIf="e.rank" class="badge badge-warning">Rank: {{ e.rank }}</div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- JOURNEY TIMELINE -->
        <div style="margin-top:6rem;">
          <app-section-header label="Journey" title="Development Journey" num="03" lead="A short timeline of how I got here and where I'm going next.">
            <span label>Journey</span>
          </app-section-header>

          @if (loadingJourney()) {
            <app-loading text="Loading journey..." />
          } @else {
            <div class="jt">
              <div class="jt-item card fade-in" *ngFor="let j of journey()">
                <div class="jt-year mono">{{ j.year }}</div>
                <h4>{{ j.title }}</h4>
                <p>{{ j.desc }}</p>
              </div>
            </div>
          }
        </div>

        <!-- LEARNING -->
        <div style="margin-top:6rem;">
          <app-section-header label="Currently Learning" title="Right Now, On My Desk" num="04" lead="Things I'm actively studying, practicing, or tinkering with this quarter.">
            <span label>Currently Learning</span>
          </app-section-header>

          <div class="learning-grid">
            <div class="learn-card card">
              <div class="learn-ic"><svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 2v14h14V5zm3 3h8v2H8zm0 4h8v2H8zm0 4h5v2H8z"/></svg></div>
              <h4>MEAN Stack Depth</h4>
              <p>Angular architecture, REST patterns, Mongoose schemas, JWT auth flows, and deployment. (This portfolio is the lab.)</p>
            </div>
            <div class="learn-card card">
              <div class="learn-ic"><svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 2 2 19h20zm0 4.4L18 17H6z"/></svg></div>
              <h4>TypeScript + React / Angular</h4>
              <p>Strong typing, component design, signals, hooks, and the subtle UI details that make a site feel solid.</p>
            </div>
            <div class="learn-card card">
              <div class="learn-ic"><svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5z"/></svg></div>
              <h4>Cybersecurity & Networking</h4>
              <p>HTTP/HTTPS, TLS, network basics, web security principles, and penetration testing concepts.</p>
            </div>
            <div class="learn-card card">
              <div class="learn-ic"><svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 4a6 6 0 1 1-6 6 6 6 0 0 1 6-6m0 2a4 4 0 1 0 4 4 4 4 0 0 0-4-4"/></svg></div>
              <h4>AI & LLMs</h4>
              <p>Beyond the API surface — how embeddings, retrieval, and structured outputs actually fit into developer tools.</p>
            </div>
            <div class="learn-card card">
              <div class="learn-ic"><svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m3 14h6v2H9zm0-4h6v2H9zm6-11V5h5z"/></svg></div>
              <h4>Automation (Python)</h4>
              <p>Extending the Laser Automation project — more reliable contour detection, better SVG output, and pipeline design.</p>
            </div>
            <div class="learn-card card">
              <div class="learn-ic"><svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm0 4h10v2H7zm0 4h6v2H7z"/></svg></div>
              <h4>Embedded & Electronics</h4>
              <p>Reading into microcontrollers, PCBs, sensors, and what it actually takes to build something like AI smart glasses.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2.5rem; align-items: start; }
    @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; } }
    .about-copy p { font-size: var(--fs-md); }
    .hl { color: var(--accent); font-weight: 600; }

    .loop {
      display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr;
      align-items: center; gap: .5rem; padding: 1.25rem;
      background: var(--gradient-soft); border-color: var(--border-strong); margin: 1.5rem 0;
    }
    .loop-step { display: flex; flex-direction: column; gap: .25rem; text-align: center; }
    .loop-step .num { font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--accent); }
    .loop-step .label { font-weight: 700; font-size: var(--fs-sm); color: var(--text); }
    .loop-step .desc { font-size: var(--fs-xxs); color: var(--text-muted); }
    .loop-arrow { width: 18px; height: 2px; background: linear-gradient(90deg, var(--accent), var(--accent-3)); border-radius: 2px; position: relative; }
    .loop-arrow::after { content: '›'; position: absolute; right: -8px; top: 50%; transform: translateY(-55%); color: var(--accent-3); font-weight: 700; font-size: 16px; }
    @media (max-width: 900px) {
      .loop { grid-template-columns: 1fr; gap: .75rem; }
      .loop-arrow { width: 2px; height: 18px; justify-self: center; background: linear-gradient(180deg, var(--accent), var(--accent-3)); }
      .loop-arrow::after { right: auto; top: auto; bottom: -10px; left: 50%; transform: translate(-50%, 0) rotate(90deg); }
    }

    .areas { margin-top: 2rem; padding: 1.5rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); backdrop-filter: blur(10px); }
    .areas h4 { margin-bottom: 1rem; font-size: var(--fs-md); }
    .areas ul { list-style: none; padding: 0; margin: 0; display: grid; gap: .65rem; }
    .areas li { display: flex; align-items: flex-start; gap: .65rem; font-size: var(--fs-sm); color: var(--text-muted); }
    .areas strong { color: var(--text); margin-right: .25rem; }
    .area-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
    .area-dot.ai { background: var(--accent-3); box-shadow: 0 0 8px var(--accent-3); }
    .area-dot.auto { background: var(--accent-2); box-shadow: 0 0 8px var(--accent-2); }
    .area-dot.sec { background: var(--danger); box-shadow: 0 0 8px var(--danger); }
    .area-dot.hw { background: var(--warning); box-shadow: 0 0 8px var(--warning); }
    .area-dot.fe { background: var(--accent); box-shadow: 0 0 8px var(--accent); }

    .about-side { display: grid; gap: 1.25rem; position: sticky; top: 90px; }
    @media (max-width: 900px) { .about-side { position: static; } }

    .profile-card .profile-head { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; }
    .avatar { width: 72px; height: 72px; flex-shrink: 0; border-radius: 18px; overflow: hidden; box-shadow: var(--shadow-glow); }
    .p-role { color: var(--accent); font-weight: 600; font-size: var(--fs-sm); }
    .p-loc { font-size: var(--fs-xxs); color: var(--text-dim); margin-top: .25rem; }
    .p-actions { display: grid; gap: .5rem; }

    .s-head { font-size: var(--fs-xs); color: var(--text-dim); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 1rem; }
    .facts { list-style: none; padding: 0; margin: 0; display: grid; gap: .5rem; }
    .facts li { display: flex; justify-content: space-between; gap: 1rem; padding: .4rem 0; border-bottom: 1px dashed var(--border); font-size: var(--fs-sm); }
    .facts li:last-child { border: none; }
    .facts li span { color: var(--text-dim); font-family: var(--font-mono); font-size: var(--fs-xxs); text-transform: uppercase; letter-spacing: .05em; }

    .edu-list { display: grid; gap: 1.25rem; }
    .edu-head { display: grid; grid-template-columns: auto 1fr auto; gap: 1rem; align-items: center; margin-bottom: 1rem; }
    @media (max-width: 720px) { .edu-head { grid-template-columns: auto 1fr; } .edu-year { grid-column: 1 / -1; justify-self: flex-start; } }
    .edu-ic { width: 48px; height: 48px; border-radius: var(--radius); background: var(--gradient-soft); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; }
    .org { font-size: var(--fs-xs); color: var(--text-muted); }
    .edu-year { color: var(--accent); font-size: var(--fs-xs); }
    .edu-facts { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .75rem; }

    .jt { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
    @media (max-width: 1024px) { .jt { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) { .jt { grid-template-columns: 1fr; } }
    .jt-year { color: var(--accent); font-size: var(--fs-xs); margin-bottom: .25rem; }
    .jt-item h4 { margin-bottom: .25rem; font-size: var(--fs-base); }
    .jt-item p { margin: 0; font-size: var(--fs-sm); }

    .learning-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
    @media (max-width: 1024px) { .learning-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) { .learning-grid { grid-template-columns: 1fr; } }
    .learn-ic {
      width: 44px; height: 44px; border-radius: var(--radius);
      background: var(--gradient-soft); color: var(--accent);
      display: inline-flex; align-items: center; justify-content: center;
      margin-bottom: 1rem;
    }
    .learn-card h4 { margin-bottom: .35rem; font-size: var(--fs-base); }
    .learn-card p { margin: 0; font-size: var(--fs-sm); }
  `]
})
export class AboutComponent implements OnInit {
  education = signal<Education[]>([]);
  loadingEdu = signal(true);
  loadingJourney = signal(false);

  journey = signal([
    { year: '2022', title: 'Started HICMIS — MIS Program', desc: 'First exposure to structured CS, systems analysis, and database concepts alongside business classes.' },
    { year: '2023', title: 'Dove into Frontend for Real', desc: 'HTML → CSS → JS. Started building small UIs instead of just reading about them.' },
    { year: '2024', title: 'Frameworks, Tooling, First Projects', desc: 'Bootstrap, Tailwind, React, Angular. Began experimenting with AI and Python automation.' },
    { year: '2025', title: 'Internships + NTI ML Training', desc: 'Front-End internship, 120h NTI ML training (91%), community work, Laser Automation and Escema concepts.' },
    { year: '2026', title: 'MEAN Stack Portfolio + FlyRank', desc: 'This portfolio. FlyRank Front-End AI Engineering program. Graduation year.' },
    { year: '→', title: 'Where I\'m Going', desc: 'Deeper into full-stack, AI-powered developer tooling, security skills, and real products people use.' },
  ]);

  constructor(private educationService: EducationService, private experienceService: ExperienceService) {}

  ngOnInit() {
    this.educationService.getAll().subscribe({
      next: (res) => { this.education.set(res.data || []); this.loadingEdu.set(false); },
      error: () => this.loadingEdu.set(false)
    });
  }
}
