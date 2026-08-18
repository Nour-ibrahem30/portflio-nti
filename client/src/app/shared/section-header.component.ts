import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fade-in">
      <span class="section-label"><ng-content select="[label]"></ng-content>{{ label }}</span>
      <h2 class="section-title">
        <span class="num" *ngIf="num">{{ num }}.</span>
        <span class="title">{{ title }}</span>
      </h2>
      <p class="section-lead" *ngIf="lead">{{ lead }}</p>
    </div>
  `
})
export class SectionHeaderComponent {
  @Input() label = '';
  @Input() title = '';
  @Input() lead = '';
  @Input() num = '';
}
