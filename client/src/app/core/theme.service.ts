import { Injectable, signal, computed, effect } from '@angular/core';
import type { Theme } from './models';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly STORAGE_KEY = 'nour-theme';
  private _theme = signal<Theme>('system');
  private _applied = signal<'dark' | 'light'>('dark');

  theme = this._theme.asReadonly();
  appliedTheme = this._applied.asReadonly();

  constructor() {
    const saved = (localStorage.getItem(this.STORAGE_KEY) as Theme) || 'system';
    this.setTheme(saved);
    if (typeof window !== 'undefined' && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this._theme() === 'system') this._applySystem();
      });
    }
  }

  setTheme(t: Theme) {
    this._theme.set(t);
    localStorage.setItem(this.STORAGE_KEY, t);
    if (t === 'system') this._applySystem();
    else this._apply(t);
  }

  toggle() {
    const cur = this._applied();
    this.setTheme(cur === 'dark' ? 'light' : 'dark');
  }

  private _applySystem() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this._apply(isDark ? 'dark' : 'light');
  }

  private _apply(t: 'dark' | 'light') {
    document.documentElement.setAttribute('data-theme', t);
    this._applied.set(t);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0a0a0f' : '#ffffff');
  }
}
