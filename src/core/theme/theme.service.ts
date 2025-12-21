import { Injectable, signal } from '@angular/core';
import { ThemeName } from './theme.types';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private dark = signal(false);
  private theme = signal<ThemeName>('default');

  isDark() {
    return this.dark();
  }

  currentTheme() {
    return this.theme();
  }

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.dark.set(prefersDark.matches);
    this.applyTheme();

    prefersDark.addEventListener('change', e => {
      this.dark.set(e.matches);
      this.applyTheme();
    });
  }

  toggleDarkMode() {
    this.dark.update(v => !v);
    this.applyTheme();
  }

  setTheme(theme: ThemeName) {
    this.theme.set(theme);
    this.applyTheme();
  }

  private applyTheme() {
    const root = document.documentElement;
    root.classList.toggle('dark', this.dark());
    root.dataset['theme'] = this.theme();
  }
}
