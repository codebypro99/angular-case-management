import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { CasesTableComponent } from '../../components/cases-table/cases-table.component';
import { CasesFacade } from '../../data-access/cases.facade';
import { CasePriority, CaseStatus, priorityLabels, statusLabels } from '../../models/case.models';
import { ButtonComponent } from '@ui/button/button.component';
import { MetricCardComponent } from '@ui/metric-card/metric-card.component';

@Component({
  selector: 'showcase-cases-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink, ButtonComponent, CasesTableComponent, MetricCardComponent],
  templateUrl: './cases-dashboard.component.html',
  styleUrl: './cases-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesDashboardComponent {
  readonly facade = inject(CasesFacade);
  readonly statusLabels = statusLabels;
  readonly priorityLabels = priorityLabels;
  readonly statuses: CaseStatus[] = ['new', 'in-review', 'approved', 'rejected'];
  readonly priorities: CasePriority[] = ['low', 'medium', 'high'];
  readonly assigneeNameById = computed(() =>
    this.facade.assignees().reduce<Record<string, string>>((acc, assignee) => {
      acc[assignee.id] = assignee.name;
      return acc;
    }, {}),
  );
  readonly newCount = computed(() => this.facade.cases().filter(item => item.status === 'new').length);
  readonly reviewCount = computed(() => this.facade.cases().filter(item => item.status === 'in-review').length);
  readonly highPriorityCount = computed(() => this.facade.cases().filter(item => item.priority === 'high').length);

  setSearch(search: string): void {
    this.facade.updateFilters({ search });
  }

  setStatus(status: string): void {
    this.facade.updateFilters({ status: status as CaseStatus | 'all' });
  }

  setPriority(priority: string): void {
    this.facade.updateFilters({ priority: priority as CasePriority | 'all' });
  }
}
