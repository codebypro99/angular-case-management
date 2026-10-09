import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CaseFormErrors } from '../models/case.models';

@Injectable()
export class CaseErrorMapper {
  apply(form: FormGroup, errors: CaseFormErrors): void {
    Object.entries(errors).forEach(([key, message]) => {
      const control = form.get(key);

      if (control) {
        control.setErrors({ backend: message });
        control.markAsTouched();
      }
    });
  }
}
