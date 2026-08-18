import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="nf-section">
      <div class="nf-inner">
        <div class="nf-code mono">404</div>
        <div class="nf-msg">
          <h1>Route not found</h1>
          <p>The page you're looking for doesn't exist, has been moved, or the link is broken.</p>
        </div>
        <a routerLink="/" class="btn btn-primary btn-lg">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3z"/></svg>
          Back to Home
        </a>
      </div>
    </section>
  `,
  styles: [`
    .nf-section {
      min-height: calc(100vh - 120px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
    }
    .nf-inner {
      text-align: center;
      max-width: 520px;
    }
    .nf-code {
      font-size: clamp(6rem, 18vw, 12rem);
      font-weight: 900;
      line-height: 1;
      background: var(--gradient);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      letter-spacing: -0.05em;
      margin-bottom: 1rem;
      filter: drop-shadow(0 4px 20px rgba(99,102,241,.25));
    }
    .nf-msg { margin-bottom: 2.5rem; }
    .nf-msg h1 {
      font-size: clamp(1.5rem, 4vw, 2rem);
      margin-bottom: .75rem;
      color: var(--text);
    }
    .nf-msg p {
      color: var(--text-muted);
      font-size: var(--fs-md);
      line-height: 1.6;
      max-width: 42ch;
      margin: 0 auto;
    }
  `]
})
export class NotFoundComponent {}
