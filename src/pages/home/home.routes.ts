import { Home } from "./home";
import { routes } from '../../app/app.routes';
import { Router, Routes } from "@angular/router";

export default [
  {
    path: '',
    title: 'Yu-Gi-Oh Dex',
    component: Home
  }
] as Routes
