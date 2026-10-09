import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CaseStatus, statusLabels } from '@features/cases/models/case.models';

@Component({
  selector: 'showcase-status-badge',
  standalone: true,
  template: `<span class="badge" [class]="status()">{{ statusLabels[status()] }}</span>`,
  styleUrl: './status-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
  readonly status = input.required<CaseStatus>();
  readonly statusLabels = statusLabels;
}
