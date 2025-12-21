import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ThemeService } from '../../core/theme/theme.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sun, Moon, ChevronDown, Check, Layers } from 'lucide-angular';
import { ThemeName } from '../../core/theme/theme.types';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {

  sun = Sun;
  moon = Moon;
  chevronDown = ChevronDown;
  check = Check;
  layers = Layers;

  open = false;

  // ===== TEMAS (IMÁGENES DESDE INTERNET) =====
  themes: {
    key: ThemeName;
    label: string;
    avatar: string;
  }[] = [
      {
        key: 'default',
        label: 'Default',
        avatar: 'https://ms.yugipedia.com//thumb/7/79/Chrome_extension_logo.png/60px-Chrome_extension_logo.png'
      },
      {
        key: 'yugi',
        label: 'Yugi',
        avatar:
          'https://ms.yugipedia.com//d/d5/Yugi-MDDG.png',
      },
      {
        key: 'kaiba',
        label: 'Kaiba',
        avatar:
          'https://ms.yugipedia.com//4/41/Kaiba-MDDG.png',
      },
      {
        key: 'atem',
        label: 'Atem',
        avatar:
          'https://ms.yugipedia.com//d/d2/YamiYugi-MDDG.png',
      },
    ];
  constructor(public theme: ThemeService) { }

  get currentAvatar(): string {
    return (
      this.themes.find(t => t.key === this.theme.currentTheme())
        ?.avatar ?? ''
    );
  }

  // ===== ACCIONES =====
  toggleMenu() {
    this.open = !this.open;
  }

  selectTheme(theme: ThemeName) {
    this.theme.setTheme(theme);
    this.open = false;
  }

  // ===== CERRAR AL CLICK FUERA =====
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.open = false;
    }
  }

}
