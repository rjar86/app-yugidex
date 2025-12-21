import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Navbar, Footer, RouterOutlet],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout { }
