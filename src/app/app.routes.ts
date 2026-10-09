import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cases',
  },
  {
    path: 'cases',
    loadChildren: () => import('./features/cases/routes/cases.routes').then(m => m.CASES_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'cases',
  },
];
