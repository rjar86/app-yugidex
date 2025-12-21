import { Injectable, signal } from '@angular/core';
import { ThemeName } from './theme.types';


const STORAGE_THEME = 'yugidex-theme';
const STORAGE_DARK = 'yugidex-dark';

@Injectable({ providedIn: 'root' })
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
    const savedTheme = localStorage.getItem(STORAGE_THEME) as ThemeName | null;
    const savedDark = localStorage.getItem(STORAGE_DARK);

    if (savedTheme) {
      this.theme.set(savedTheme);
    }

    if (savedDark !== null) {
      this.dark.set(savedDark === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.dark.set(prefersDark.matches);
    }

    this.applyTheme();
  }

  toggleDarkMode() {
    this.dark.update(v => !v);
    localStorage.setItem(STORAGE_DARK, String(this.dark()));
    this.applyTheme();
  }

  setTheme(theme: ThemeName) {
    this.theme.set(theme);
    localStorage.setItem(STORAGE_THEME, theme);
    this.applyTheme();
  }

  private applyTheme() {
    const root = document.documentElement;
    root.classList.toggle('dark', this.dark());
    root.dataset['theme'] = this.theme();
  }
}
