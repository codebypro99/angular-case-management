# Angular Case Management Dashboard

A demonstration Angular application for managing cases. Users can browse, search, and filter records, create and edit cases, save drafts, and submit cases for review.

## Project Purpose

This project shows how I organize Angular code for ongoing development and maintenance by separating the user interface, state management, data access, and form logic. The example makes it possible to follow the complete flow from a user action to a state update and its presentation in the interface.

It demonstrates an approach to building internal business applications with a clear structure, explicit state operations, and reusable components.

## User Workflows

- Browse a paginated list of cases.
- Search by title, requester, and summary.
- Filter by status and priority.
- Create and edit a case.
- Save drafts manually and automatically save valid changes while editing.
- Submit a case for review.
- Display validation errors next to the relevant form fields.

## What the Code Demonstrates

### Feature-Based Architecture

Components, pages, models, routes, and data access are grouped around the case-management feature. This structure keeps related code together and supports extending the feature while maintaining clear responsibilities.

### State Management with NGXS

Actions describe loading, filtering, creation, saving, and status changes. Selectors expose the list, filters, current case, errors, and loading and saving states.

### A Facade Between Pages and Application Logic

Pages interact with `CasesFacade`, which coordinates state operations, form payload preparation, autosave, and navigation after operations. This reduces the amount of orchestration logic in page components.

### Reactive Forms and Validation

Form creation and conversion of form values into payloads are handled by a dedicated service. Validation errors from the mock API are mapped to form fields. Autosave waits briefly after changes and runs when the form is valid.

### Asynchronous Workflows

RxJS coordinates operation sequences and autosave. Route resolvers load data before the corresponding pages open. Subscriptions are cleaned up according to component and service lifecycles.

### Reusable User Interface

The application uses standalone components, `OnPush` change detection, and Angular Signals to expose state and derived values. Buttons, status badges, metric cards, and empty states are implemented as separate UI components.

## Technology Stack

- Angular 20 and TypeScript.
- NGXS for state management.
- RxJS for asynchronous operations.
- Angular Reactive Forms.
- Angular Router and route resolvers.
- SCSS.

## Demo Scope and Limitations

The API is simulated by a local service with response delays and validation errors. Data is stored in memory and resets when the page is reloaded. No separate backend server is required to explore the example.

The domain and data are fictional. The example focuses on frontend architecture and case-management workflows; it does not demonstrate integration with a real backend or authentication.

This description is based on a review of the implementation. Build verification and user-workflow checks are the next preparation step before publication.

## Portfolio Message

I can turn a business workflow into a clearly structured Angular application that is straightforward to maintain and extend.
