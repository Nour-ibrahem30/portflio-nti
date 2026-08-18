import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="empty">
      <div class="emoji">{{ icon }}</div>
      <h4>{{ title }}</h4>
      <p>{{ message }}</p>
      <a *ngIf="link && linkText" [routerLink]="link" class="btn btn-primary">{{ linkText }}</a>
    </div>
  `,
  styles: [`
    .empty { padding: 4rem 2rem; text-align: center; border: 1px dashed var(--border); border-radius: var(--radius-lg); }
    .emoji { font-size: 48px; margin-bottom: 1rem; opacity: .7; }
    h4 { margin-bottom: .5rem; }
    p { color: var(--text-muted); margin-bottom: 1.5rem; }
  `]
})
export class EmptyComponent {
  @Input() icon = '📭';
  @Input() title = 'Nothing here yet';
  @Input() message = 'Check back soon or try a different filter.';
  @Input() link: any[] | string | null = null;
  @Input() linkText = '';
}
