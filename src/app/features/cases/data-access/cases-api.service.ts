import { Injectable } from '@angular/core';

import { Observable, delay, map, of, throwError } from 'rxjs';

import { ListResult } from '@core/models/list-result';
import { mockAssignees, mockCases } from '@shared/mock-api/mock-cases.db';

import { CaseAssignee, CaseDraftPayload, CaseFilters, CaseFormErrors, CaseRecord, CaseStatus } from '../models/case.models';

@Injectable({ providedIn: 'root' })
export class CasesApiService {
  private cases = [...mockCases];

  getAssignees(): Observable<CaseAssignee[]> {
    return of(mockAssignees).pipe(delay(180));
  }

  getCases(filters: CaseFilters): Observable<ListResult<CaseRecord>> {
    return of(this.cases).pipe(
      delay(260),
      map(cases => this.applyFilters(cases, filters)),
    );
  }

  getCase(id: string): Observable<CaseRecord> {
    const item = this.cases.find(current => current.id === id);

    if (!item) {
      return throwError(() => new Error('Case was not found'));
    }

    return of({ ...item }).pipe(delay(220));
  }

  createDraft(payload: CaseDraftPayload): Observable<CaseRecord> {
    const errors = this.validate(payload);

    if (Object.keys(errors).length) {
      return throwError(() => ({ status: 422, errors }));
    }

    const draft: CaseRecord = {
      id: `case-${Math.floor(2000 + Math.random() * 8000)}`,
      status: 'new',
      updatedAt: new Date().toISOString(),
      ...payload,
    };

    this.cases = [draft, ...this.cases];

    return of({ ...draft }).pipe(delay(300));
  }

  updateDraft(id: string, payload: CaseDraftPayload): Observable<CaseRecord> {
    const errors = this.validate(payload);

    if (Object.keys(errors).length) {
      return throwError(() => ({ status: 422, errors }));
    }

    const current = this.cases.find(item => item.id === id);

    if (!current) {
      return throwError(() => new Error('Case was not found'));
    }

    const updated = {
      ...current,
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    this.cases = this.cases.map(item => (item.id === id ? updated : item));

    return of({ ...updated }).pipe(delay(260));
  }

  changeStatus(id: string, status: CaseStatus): Observable<CaseRecord> {
    const current = this.cases.find(item => item.id === id);

    if (!current) {
      return throwError(() => new Error('Case was not found'));
    }

    const updated = {
      ...current,
      status,
      updatedAt: new Date().toISOString(),
    };

    this.cases = this.cases.map(item => (item.id === id ? updated : item));

    return of({ ...updated }).pipe(delay(220));
  }

  private applyFilters(cases: CaseRecord[], filters: CaseFilters): ListResult<CaseRecord> {
    const search = filters.search.trim().toLowerCase();
    const filtered = cases.filter(item => {
      const matchesSearch = !search || [item.title, item.requester, item.summary].some(value => value.toLowerCase().includes(search));
      const matchesStatus = filters.status === 'all' || item.status === filters.status;
      const matchesPriority = filters.priority === 'all' || item.priority === filters.priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    const start = (filters.page - 1) * filters.perPage;

    return {
      items: filtered.slice(start, start + filters.perPage),
      total: filtered.length,
    };
  }

  private validate(payload: CaseDraftPayload): CaseFormErrors {
    const errors: CaseFormErrors = {};

    if (payload.title.trim().length < 4) {
      errors.title = 'Title must contain at least 4 characters.';
    }

    if (!payload.requester.trim()) {
      errors.requester = 'Requester is required.';
    }

    if (!payload.dueDate) {
      errors.dueDate = 'Due date is required.';
    }

    if (payload.summary.trim().length < 20) {
      errors.summary = 'Summary must contain at least 20 characters.';
    }

    return errors;
  }
}
