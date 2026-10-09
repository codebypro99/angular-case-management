import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';
import { EMPTY, Subject, catchError, debounceTime, filter, switchMap, tap, throwError } from 'rxjs';

import { CaseErrorMapper } from './case-error.mapper';
import { CaseFormBuilder } from './case-form.builder';
import { CaseDraftPayload, CaseFilters, CaseRecord, CaseStatus } from '../models/case.models';
import { ChangeCaseStatus, ClearCaseEditor, CreateCaseDraft, LoadCaseForEdit, LoadCases, SetCaseFilters, SubmitCase, UpdateCaseDraft } from '../store/cases.actions';
import { CasesState } from '../store/cases.state';

@Injectable()
export class CasesFacade {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly builder = inject(CaseFormBuilder);
  private readonly errorMapper = inject(CaseErrorMapper);
  private readonly autosave$ = new Subject<{ id: string; form: FormGroup }>();

  readonly assignees = this.store.selectSignal(CasesState.assignees);
  readonly filters = this.store.selectSignal(CasesState.filters);
  readonly cases = this.store.selectSignal(CasesState.list);
  readonly total = this.store.selectSignal(CasesState.total);
  readonly current = this.store.selectSignal(CasesState.current);
  readonly loading = this.store.selectSignal(CasesState.loading);
  readonly saving = this.store.selectSignal(CasesState.saving);
  readonly errors = this.store.selectSignal(CasesState.errors);
  readonly pageCount = computed(() => Math.ceil(this.total() / this.filters().perPage));
  readonly lastSavedAt = signal<string | null>(null);

  constructor() {
    this.autosave$
      .pipe(
        debounceTime(900),
        filter(({ form }) => form.valid),
        switchMap(({ id, form }) => this.updateDraft(id, this.toPayload(form), true).pipe(catchError(() => EMPTY))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.lastSavedAt.set(new Date().toLocaleTimeString()));
  }

  loadDashboard() {
    return this.store.dispatch(new LoadCases());
  }

  updateFilters(filters: Partial<CaseFilters>) {
    return this.store.dispatch(new SetCaseFilters(filters));
  }

  loadForEdit(id: string) {
    return this.store.dispatch(new LoadCaseForEdit(id));
  }

  createForm(record?: CaseRecord) {
    return this.builder.create(record);
  }

  createDraft(form: FormGroup) {
    return this.store.dispatch(new CreateCaseDraft(this.toPayload(form))).pipe(
      tap(() => this.applyNavigationAfterCreate()),
      catchError(error => this.handleFormError(form, error)),
    );
  }

  updateDraft(id: string, payload: CaseDraftPayload, silent = false) {
    return this.store.dispatch(new UpdateCaseDraft(id, payload, silent));
  }

  save(id: string, form: FormGroup) {
    return this.updateDraft(id, this.toPayload(form)).pipe(catchError(error => this.handleFormError(form, error)));
  }

  submit(id: string, form: FormGroup) {
    return this.save(id, form).pipe(
      switchMap(() => this.store.dispatch(new SubmitCase(id))),
      switchMap(() => this.router.navigate(['/cases'])),
      catchError(error => this.handleFormError(form, error)),
    );
  }

  changeStatus(id: string, status: CaseStatus) {
    return this.store.dispatch(new ChangeCaseStatus(id, status));
  }

  connectAutosave(id: string, form: FormGroup) {
    return form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.autosave$.next({ id, form }));
  }

  clearEditor() {
    return this.store.dispatch(new ClearCaseEditor());
  }

  private toPayload(form: FormGroup): CaseDraftPayload {
    return this.builder.toPayload(form.getRawValue());
  }

  private handleFormError(form: FormGroup, error: unknown) {
    this.errorMapper.apply(form, this.errors());
    return throwError(() => error);
  }

  private applyNavigationAfterCreate(): void {
    const id = this.current()?.id;

    if (id) {
      void this.router.navigate(['/cases', id, 'edit']);
    }
  }
}
