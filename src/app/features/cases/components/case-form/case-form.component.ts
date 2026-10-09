import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CaseAssignee, CasePriority, priorityLabels } from '../../models/case.models';
import { ButtonComponent } from '@ui/button/button.component';

@Component({
  selector: 'showcase-case-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './case-form.component.html',
  styleUrl: './case-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseFormComponent {
  readonly form = input.required<FormGroup>();
  readonly assignees = input.required<CaseAssignee[]>();
  readonly saving = input(false);
  readonly isEdit = input(false);
  readonly lastSavedAt = input<string | null>(null);
  readonly saved = output<void>();
  readonly submitted = output<void>();
  readonly priorityLabels = priorityLabels;
  readonly priorities: CasePriority[] = ['low', 'medium', 'high'];

  error(controlName: string): string | null {
    const control = this.form().get(controlName);

    if (!control || !control.touched || !control.errors) {
      return null;
    }

    if (control.errors['backend']) {
      return control.errors['backend'];
    }

    if (control.errors['required']) {
      return 'This field is required.';
    }

    if (control.errors['minlength']) {
      return `Use at least ${control.errors['minlength'].requiredLength} characters.`;
    }

    return 'Invalid value.';
  }
}
