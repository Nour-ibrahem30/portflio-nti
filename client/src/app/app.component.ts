import { Component, Signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './shared/navbar.component';
import { FooterComponent } from './shared/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <a href="#main" class="skip-link">Skip to content</a>
    <app-navbar />
    <main id="main" role="main" class="main">
      <router-outlet />
    </main>
    <app-footer *ngIf="!isAdminRoute()" />
  `,
  styles: [`
    .main { position: relative; z-index: 1; min-height: calc(100vh - 72px); }
  `]
})
export class AppComponent {
  title = 'Nour Ibrahem — Portfolio';

  constructor(public auth: AuthService, public router: Router) {
    effect(() => {
      if (this.auth.isLoggedIn()) this.auth.me().subscribe();
    });
  }

  isAdminRoute() {
    return this.router.url.startsWith('/admin');
  }
}
