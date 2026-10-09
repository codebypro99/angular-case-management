import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'showcase-button',
  standalone: true,
  template: `
    <button class="button" [class.secondary]="variant() === 'secondary'" [class.danger]="variant() === 'danger'" [type]="type()" [disabled]="disabled()">
      <ng-content />
    </button>
  `,
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'danger'>('primary');
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
}
