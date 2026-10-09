import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { CaseFormComponent } from '../../components/case-form/case-form.component';
import { CasesFacade } from '../../data-access/cases.facade';
import { ButtonComponent } from '@ui/button/button.component';

@Component({
  selector: 'showcase-case-editor',
  standalone: true,
  imports: [RouterLink, ButtonComponent, CaseFormComponent],
  templateUrl: './case-editor.component.html',
  styleUrl: './case-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseEditorComponent implements OnInit, OnDestroy {
  readonly facade = inject(CasesFacade);
  private readonly route = inject(ActivatedRoute);
  private autosaveSubscription?: Subscription;
  readonly caseId = computed(() => this.route.snapshot.paramMap.get('id'));
  readonly form = this.facade.createForm(this.facade.current() ?? undefined);

  ngOnInit(): void {
    this.facade.loadDashboard().subscribe();
    const id = this.caseId();

    if (id) {
      this.autosaveSubscription = this.facade.connectAutosave(id, this.form);
    }
  }

  ngOnDestroy(): void {
    this.autosaveSubscription?.unsubscribe();
    this.facade.clearEditor();
  }

  save(): void {
    const id = this.caseId();

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    if (id) {
      this.facade.save(id, this.form).subscribe();
      return;
    }

    this.facade.createDraft(this.form).subscribe();
  }

  submit(): void {
    const id = this.caseId();

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    if (id) {
      this.facade.submit(id, this.form).subscribe();
      return;
    }

    this.facade.createDraft(this.form).subscribe(() => {
      const createdId = this.facade.current()?.id;

      if (createdId) {
        this.facade.submit(createdId, this.form).subscribe();
      }
    });
  }
}
