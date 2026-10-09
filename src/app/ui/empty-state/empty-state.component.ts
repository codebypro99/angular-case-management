import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'showcase-empty-state',
  standalone: true,
  template: `
    <div class="empty">
      <strong>{{ title() }}</strong>
      <p>{{ message() }}</p>
    </div>
  `,
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  readonly title = input('Nothing found');
  readonly message = input('Try changing filters or creating a new record.');
}
