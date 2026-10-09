import { Routes } from '@angular/router';

import { CaseErrorMapper } from '../data-access/case-error.mapper';
import { CaseFormBuilder } from '../data-access/case-form.builder';
import { CasesFacade } from '../data-access/cases.facade';
import { caseEditorResolver } from '../resolver/case-editor.resolver';
import { casesDashboardResolver } from '../resolver/cases-dashboard.resolver';

export const CASES_ROUTES: Routes = [
  {
    path: '',
    providers: [CasesFacade, CaseFormBuilder, CaseErrorMapper],
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/cases-dashboard/cases-dashboard.component').then(m => m.CasesDashboardComponent),
        resolve: {
          dashboard: casesDashboardResolver,
        },
      },
      {
        path: 'new',
        loadComponent: () => import('../pages/case-editor/case-editor.component').then(m => m.CaseEditorComponent),
      },
      {
        path: ':id/edit',
        loadComponent: () => import('../pages/case-editor/case-editor.component').then(m => m.CaseEditorComponent),
        resolve: {
          case: caseEditorResolver,
        },
      },
    ],
  },
];
