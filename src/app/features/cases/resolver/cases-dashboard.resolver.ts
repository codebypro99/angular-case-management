import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { CasesFacade } from '../data-access/cases.facade';

export const casesDashboardResolver: ResolveFn<unknown> = () => inject(CasesFacade).loadDashboard();
