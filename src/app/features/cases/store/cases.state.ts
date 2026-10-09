import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { switchMap, tap } from 'rxjs';

import { CasesApiService } from '../data-access/cases-api.service';
import { CaseAssignee, CaseFormErrors, CaseRecord, defaultCaseFilters, CaseFilters } from '../models/case.models';

import {
  ChangeCaseStatus,
  ClearCaseEditor,
  CreateCaseDraft,
  LoadCaseForEdit,
  LoadCases,
  SetCaseFilters,
  SubmitCase,
  UpdateCaseDraft,
} from './cases.actions';

export interface CasesStateModel {
  assignees: CaseAssignee[];
  filters: CaseFilters;
  list: CaseRecord[];
  total: number;
  current: CaseRecord | null;
  loading: boolean;
  saving: boolean;
  errors: CaseFormErrors;
}

const defaults: CasesStateModel = {
  assignees: [],
  filters: defaultCaseFilters,
  list: [],
  total: 0,
  current: null,
  loading: false,
  saving: false,
  errors: {},
};

@State<CasesStateModel>({
  name: 'cases',
  defaults,
})
@Injectable()
export class CasesState {
  constructor(private readonly api: CasesApiService) {}

  @Selector()
  static assignees(state: CasesStateModel): CaseAssignee[] {
    return state.assignees;
  }

  @Selector()
  static filters(state: CasesStateModel): CaseFilters {
    return state.filters;
  }

  @Selector()
  static list(state: CasesStateModel): CaseRecord[] {
    return state.list;
  }

  @Selector()
  static total(state: CasesStateModel): number {
    return state.total;
  }

  @Selector()
  static current(state: CasesStateModel): CaseRecord | null {
    return state.current;
  }

  @Selector()
  static loading(state: CasesStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static saving(state: CasesStateModel): boolean {
    return state.saving;
  }

  @Selector()
  static errors(state: CasesStateModel): CaseFormErrors {
    return state.errors;
  }

  @Action(LoadCases)
  loadCases(ctx: StateContext<CasesStateModel>) {
    ctx.patchState({ loading: true });

    return this.api.getAssignees().pipe(
      tap(assignees => ctx.patchState({ assignees })),
      switchMap(() => this.api.getCases(ctx.getState().filters)),
      tap(result => {
        ctx.patchState({
          list: result.items,
          total: result.total,
          loading: false,
        });
      }),
    );
  }

  @Action(SetCaseFilters)
  setFilters(ctx: StateContext<CasesStateModel>, { filters }: SetCaseFilters) {
    const current = ctx.getState().filters;
    ctx.patchState({
      filters: {
        ...current,
        ...filters,
        page: filters.page ?? 1,
      },
    });

    return ctx.dispatch(new LoadCases());
  }

  @Action(LoadCaseForEdit)
  loadCaseForEdit(ctx: StateContext<CasesStateModel>, { id }: LoadCaseForEdit) {
    ctx.patchState({ current: null, loading: true, errors: {} });

    return this.api.getCase(id).pipe(
      tap(current => {
        ctx.patchState({ current, loading: false });
      }),
    );
  }

  @Action(CreateCaseDraft)
  createDraft(ctx: StateContext<CasesStateModel>, { payload }: CreateCaseDraft) {
    ctx.patchState({ saving: true, errors: {} });

    return this.api.createDraft(payload).pipe(
      tap({
        next: current => ctx.patchState({ current, saving: false }),
        error: error => ctx.patchState({ errors: error.errors ?? {}, saving: false }),
      }),
    );
  }

  @Action(UpdateCaseDraft)
  updateDraft(ctx: StateContext<CasesStateModel>, { id, payload }: UpdateCaseDraft) {
    ctx.patchState({ saving: true, errors: {} });

    return this.api.updateDraft(id, payload).pipe(
      tap({
        next: current => ctx.patchState({ current, saving: false }),
        error: error => ctx.patchState({ errors: error.errors ?? {}, saving: false }),
      }),
    );
  }

  @Action(SubmitCase)
  submitCase(ctx: StateContext<CasesStateModel>, { id }: SubmitCase) {
    return ctx.dispatch(new ChangeCaseStatus(id, 'in-review'));
  }

  @Action(ChangeCaseStatus)
  changeStatus(ctx: StateContext<CasesStateModel>, { id, status }: ChangeCaseStatus) {
    ctx.patchState({ saving: true });

    return this.api.changeStatus(id, status).pipe(
      tap(current => {
        const list = ctx.getState().list.map(item => (item.id === current.id ? current : item));
        ctx.patchState({ current, list, saving: false });
      }),
    );
  }

  @Action(ClearCaseEditor)
  clearEditor(ctx: StateContext<CasesStateModel>): void {
    ctx.patchState({ current: null, errors: {}, saving: false });
  }
}
