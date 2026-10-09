import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CaseRecord, CaseStatus, priorityLabels } from '../../models/case.models';
import { ButtonComponent } from '@ui/button/button.component';
import { EmptyStateComponent } from '@ui/empty-state/empty-state.component';
import { StatusBadgeComponent } from '@ui/status-badge/status-badge.component';

@Component({
  selector: 'showcase-cases-table',
  standalone: true,
  imports: [DatePipe, RouterLink, ButtonComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './cases-table.component.html',
  styleUrl: './cases-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesTableComponent {
  readonly cases = input.required<CaseRecord[]>();
  readonly assigneeNameById = input.required<Record<string, string>>();
  readonly statusChanged = output<{ id: string; status: CaseStatus }>();
  readonly priorityLabels = priorityLabels;
}
