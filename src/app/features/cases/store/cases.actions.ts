import { CaseDraftPayload, CaseFilters, CaseStatus } from '../models/case.models';

export class LoadCases {
  static readonly type = '[Cases] Load cases';
}

export class SetCaseFilters {
  static readonly type = '[Cases] Set filters';

  constructor(public readonly filters: Partial<CaseFilters>) {}
}

export class LoadCaseForEdit {
  static readonly type = '[Cases] Load case for edit';

  constructor(public readonly id: string) {}
}

export class CreateCaseDraft {
  static readonly type = '[Cases] Create draft';

  constructor(public readonly payload: CaseDraftPayload) {}
}

export class UpdateCaseDraft {
  static readonly type = '[Cases] Update draft';

  constructor(
    public readonly id: string,
    public readonly payload: CaseDraftPayload,
    public readonly silent = false,
  ) {}
}

export class SubmitCase {
  static readonly type = '[Cases] Submit case';

  constructor(public readonly id: string) {}
}

export class ChangeCaseStatus {
  static readonly type = '[Cases] Change status';

  constructor(
    public readonly id: string,
    public readonly status: CaseStatus,
  ) {}
}

export class ClearCaseEditor {
  static readonly type = '[Cases] Clear editor';
}
