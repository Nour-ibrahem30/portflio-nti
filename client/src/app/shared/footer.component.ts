import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="grid grid-3 top">
          <div>
            <a routerLink="/" class="brand-footer">
              <span class="brand-mark">
                <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
                  <defs>
                    <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#6366f1"/>
                      <stop offset="50%" stop-color="#a855f7"/>
                      <stop offset="100%" stop-color="#22d3ee"/>
                    </linearGradient>
                  </defs>
                  <rect width="40" height="40" rx="10" fill="url(#fg)"/>
                  <text x="20" y="26" font-family="ui-monospace,monospace" font-size="18" font-weight="700" fill="#fff" text-anchor="middle">N</text>
                </svg>
              </span>
              <div>
                <div class="name">Nour Ibrahem</div>
                <div class="mono tag">Front-End / Full-Stack Developer</div>
              </div>
            </a>
            <p class="about">
              I build interfaces and explore where AI, automation, cybersecurity, and modern software engineering intersect. Always learning, always shipping.
            </p>
            <div class="status-line mono">
              <span class="dot"></span>
              Currently building: <strong>MEAN Stack Portfolio</strong>
            </div>
          </div>

          <div>
            <h4 class="f-title">Navigate</h4>
            <ul class="f-list">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/about">About</a></li>
              <li><a routerLink="/skills">Skills</a></li>
              <li><a routerLink="/experience">Experience</a></li>
              <li><a routerLink="/projects">Projects</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 class="f-title">Elsewhere</h4>
            <ul class="f-list">
              <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <span class="icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>
                </span>
                GitHub
              </a></li>
              <li><a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                <span class="icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.66 4.78 6.11V21h-4v-5.35c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H9z"/></svg>
                </span>
                LinkedIn
              </a></li>
              <li><a routerLink="/contact">
                <span class="icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/></svg>
                </span>
                Email Me
              </a></li>
              <li><a routerLink="/admin/login">
                <span class="icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"/></svg>
                </span>
                Admin
              </a></li>
            </ul>
            <div class="theme-switcher">
              <span class="mono label">theme:</span>
              <div class="opts">
                <button [class.active]="theme.theme()==='dark'" (click)="theme.setTheme('dark')" aria-label="Dark theme">dark</button>
                <button [class.active]="theme.theme()==='light'" (click)="theme.setTheme('light')" aria-label="Light theme">light</button>
                <button [class.active]="theme.theme()==='system'" (click)="theme.setTheme('system')" aria-label="System theme">system</button>
              </div>
            </div>
          </div>
        </div>

        <div class="bottom">
          <p class="copy mono">
            <span class="prompt">$</span> echo "© {{year}} Nour Ibrahem — Built with MEAN Stack — Learn → Build → Break → Fix → Improve → Ship"
          </p>
          <p class="tech mono">Angular · Express · Node.js · MongoDB · Mongoose · JWT</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { border-top: 1px solid var(--border); padding: 4rem 0 2rem; position: relative; z-index: 1; }
    .top { align-items: flex-start; }
    .brand-footer { display: inline-flex; gap: .75rem; align-items: center; color: var(--text); margin-bottom: 1rem; }
    .brand-footer .name { font-weight: 700; font-size: var(--fs-md); line-height: 1; }
    .brand-footer .tag { font-size: 11px; color: var(--text-dim); margin-top: 4px; }
    .about { color: var(--text-muted); max-width: 420px; }
    .status-line { display: inline-flex; align-items: center; gap: .4rem; font-size: var(--fs-xs); color: var(--text-muted); background: var(--bg-soft); padding: .4rem .65rem; border-radius: var(--radius-sm); border: 1px solid var(--border); }
    .status-line .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--success); box-shadow: 0 0 10px var(--success); animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }

    .f-title { font-size: var(--fs-xs); text-transform: uppercase; letter-spacing: .1em; color: var(--text-dim); font-family: var(--font-mono); margin-bottom: 1rem; }
    .f-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .4rem; }
    .f-list a { display: inline-flex; align-items: center; gap: .5rem; padding: .35rem 0; color: var(--text-muted); font-size: var(--fs-sm); }
    .f-list a:hover { color: var(--accent); }
    .icon { display: inline-flex; opacity: .8; }

    .theme-switcher { margin-top: 1.25rem; display: flex; align-items: center; gap: .5rem; }
    .theme-switcher .label { color: var(--text-dim); font-size: var(--fs-xxs); }
    .opts { display: inline-flex; background: var(--bg-soft); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 2px; }
    .opts button {
      background: transparent; border: none; padding: .25rem .6rem; font-family: var(--font-mono); font-size: var(--fs-xxs);
      color: var(--text-muted); cursor: pointer; border-radius: 4px; transition: all var(--transition);
    }
    .opts button.active { background: var(--gradient-soft); color: var(--accent); }

    .bottom { border-top: 1px solid var(--border); margin-top: 3rem; padding-top: 1.5rem; }
    .copy { color: var(--text-dim); font-size: var(--fs-xs); margin: 0; }
    .copy .prompt { color: var(--accent); margin-right: .25rem; }
    .tech { color: var(--text-dim); font-size: var(--fs-xxs); margin: .5rem 0 0; }
    @media (max-width: 900px) {
      .grid-3 { grid-template-columns: 1fr; }
    }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
  constructor(public theme: ThemeService) {}
}
