import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header.component';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  template: `
    <section class="section" style="padding-top:3rem;">
      <div class="container">
        <app-section-header label="CV" title="Curriculum Vitae" num="01" lead="My full resume with education, experience, skills, and projects — available for download.">
          <span label>CV</span>
        </app-section-header>

        <div class="cv-wrap">
          <div class="card cv-card fade-in">
            <div class="cv-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden="true">
                <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 2 5 5h-5zM9 13h6v2H9zm0 4h6v2H9zm0-8h3v2H9z"/>
              </svg>
            </div>
            <h2>Curriculum Vitae</h2>
            <p class="cv-placeholder">
              PDF CV available soon — add your PDF to <code class="mono">/assets/cv.pdf</code> and update the link below.
            </p>
            <div class="cv-info">
              <div class="cv-info-item">
                <span class="mono label">Format</span>
                <strong>PDF</strong>
              </div>
              <div class="cv-info-item">
                <span class="mono label">Status</span>
                <span class="badge badge-warning">Coming Soon</span>
              </div>
            </div>
            <a
              href="/assets/cv.pdf"
              download="Nour-Ibrahem-CV.pdf"
              class="btn btn-primary btn-lg btn-block"
              aria-disabled="true"
              style="pointer-events:none;opacity:.6;"
              (click)="$event.preventDefault()"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path fill="currentColor" d="M5 20h14v-2H5zm7-18-5 5h3v8h4V7h3z"/>
              </svg>
              Download CV (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cv-wrap {
      display: flex;
      justify-content: center;
      margin-top: 3rem;
    }
    .cv-card {
      width: 100%;
      max-width: 520px;
      padding: 3rem 2rem;
      text-align: center;
      background: var(--gradient-soft);
      border-color: var(--border-strong);
    }
    .cv-icon {
      width: 84px;
      height: 84px;
      margin: 0 auto 1.5rem;
      border-radius: 24px;
      background: var(--bg-elev);
      border: 1px solid var(--border);
      color: var(--accent);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-glow);
    }
    .cv-card h2 {
      margin-bottom: 1rem;
      font-size: var(--fs-xl);
    }
    .cv-placeholder {
      color: var(--text-muted);
      font-size: var(--fs-md);
      margin-bottom: 1.75rem;
      line-height: 1.6;
    }
    .cv-placeholder code {
      background: var(--bg-elev);
      padding: 2px 8px;
      border-radius: 6px;
      font-size: var(--fs-xxs);
      border: 1px solid var(--border);
      color: var(--accent);
    }
    .cv-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1.25rem;
      background: var(--bg-elev);
      border: 1px solid var(--border);
      border-radius: var(--radius);
    }
    .cv-info-item {
      display: grid;
      gap: .25rem;
      text-align: center;
    }
    .cv-info-item .label {
      font-size: 10px;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: .08em;
    }
  `]
})
export class CvComponent {}
