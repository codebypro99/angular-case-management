import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { CasesFacade } from '../data-access/cases.facade';

export const caseEditorResolver: ResolveFn<unknown> = route => {
  const id = route.paramMap.get('id');

  return id ? inject(CasesFacade).loadForEdit(id) : true;
};
