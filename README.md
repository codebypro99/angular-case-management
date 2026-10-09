# Angular Enterprise Dashboard Showcase

This repository is a sanitized, NDA-safe Angular showcase built from production architecture patterns:

- standalone Angular components
- feature-first folder structure
- NGXS actions, selectors, and state
- facade-based component orchestration
- resolver-based data loading
- mock API layer with realistic latency and failures
- reactive forms with draft autosave and backend error mapping
- reusable UI components

The domain is intentionally generic. It demonstrates a case-management workflow without using private business names,
real API contracts, customer assets, patient data, or production infrastructure.

## What This Shows

The app is small, but it is structured like a production dashboard feature:

```text
src/app/features/cases/
  components/      Stateless feature UI
  data-access/     Facade, mock API service, mappers, validation
  models/          Types and constants
  pages/           Routed smart components
  resolver/        Route preloading
  routes/          Feature route config
  store/           NGXS actions and state
```

## Run Locally

```bash
npm install
npm start
```

The app runs at `http://localhost:4300/`.

## Build

```bash
npm run build
```

## Portfolio Notes

This project is designed for clients who want to evaluate code quality without seeing private project code. The patterns
mirror enterprise Angular work: state transitions are explicit, page components depend on facades, dumb components are
input/output driven, and API behavior is isolated behind data-access services.
