import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'showcase-metric-card',
  standalone: true,
  template: `
    <section class="metric">
      <span>{{ label() }}</span>
      <strong>{{ value() }}</strong>
    </section>
  `,
  styleUrl: './metric-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
}
