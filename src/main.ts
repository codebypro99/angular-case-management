import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideStore } from '@ngxs/store';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { CasesState } from './app/features/cases/store/cases.state';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideStore([CasesState], {
      developmentMode: true,
    }),
  ],
}).catch(error => console.error(error));
