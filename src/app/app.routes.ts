import { Routes } from '@angular/router';
import { Layout } from '../layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [{
      path: '', loadChildren: () => import('../pages/home/home.routes')
    }]
  }
];
