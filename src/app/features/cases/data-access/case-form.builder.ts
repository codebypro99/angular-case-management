import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CaseDraftPayload, CaseRecord } from '../models/case.models';

@Injectable()
export class CaseFormBuilder {
  constructor(private readonly fb: FormBuilder) {}

  create(record?: CaseRecord) {
    return this.fb.nonNullable.group({
      title: [record?.title ?? '', [Validators.required, Validators.minLength(4)]],
      requester: [record?.requester ?? '', Validators.required],
      priority: [record?.priority ?? 'medium', Validators.required],
      assigneeId: [record?.assigneeId ?? null as string | null],
      dueDate: [record?.dueDate ?? '', Validators.required],
      summary: [record?.summary ?? '', [Validators.required, Validators.minLength(20)]],
    });
  }

  toPayload(formValue: CaseDraftPayload): CaseDraftPayload {
    return {
      title: formValue.title.trim(),
      requester: formValue.requester.trim(),
      priority: formValue.priority,
      assigneeId: formValue.assigneeId,
      dueDate: formValue.dueDate,
      summary: formValue.summary.trim(),
    };
  }
}
