import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading" [style.padding]="padding">
      <div class="spinner" [style.width]="size + 'px'" [style.height]="size + 'px'" [style.borderWidth]="Math.max(2, size/10) + 'px'"></div>
      <p *ngIf="text" class="mono" style="margin-top:1rem;color:var(--text-dim);font-size:12px;">{{ text }}</p>
    </div>
  `,
  styles: [`
    .loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px; }
  `]
})
export class LoadingComponent {
  @Input() size = 28;
  @Input() text = 'Loading...';
  @Input() padding = '4rem 0';
}
