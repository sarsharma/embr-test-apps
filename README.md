# single-fe-be — frontend + backend in one Embr environment

A sample app that exercises Embr's `static.build` feature ("Shape B"): a **separately built
frontend** and a **backend** deployed to a **single environment** under **one URL**.

```
.
├── embr.yaml          # platform/run = backend; static.build = frontend; routePrefixes = /api
├── apps/
│   ├── api/           # Express backend — owns /api/*
│   │   ├── package.json
│   │   └── server.js  # GET /api/health, GET /api/hello
│   └── web/           # Vite + React SPA — built to dist/, served from the CDN
│       ├── package.json
│       ├── vite.config.js
│       ├── index.html
│       └── src/{main.jsx, App.jsx}
```

## How it works

- **Backend** (`apps/api`) is the runtime app: `embr.yaml` sets `rootDirectory: apps/api`,
  `run.startCommand: node server.js`, and `run.routePrefixes: ["/api"]` — so every request under
  `/api/*` is routed to the container.
- **Frontend** (`apps/web`) is built separately in the same build sandbox via
  `static.build` (`buildCommand: npm install && npm run build`, `outputDirectory: dist`) and
  uploaded to the CDN. With `spaFallback: true`, client-side routes resolve to `index.html`.
- **One URL:** `/api/*` → backend; everything else → the static frontend. The frontend calls the
  backend same-origin (`fetch('/api/hello')`) — no CORS, no API base URL.

## Deploy

```bash
embr quickstart deploy <owner>/embr-test-apps -i <installationId> -b single-fe-be
# or
embr projects create --repo <owner>/embr-test-apps --installation-id <id>
embr environments create -p <projectId> -n production -b single-fe-be
embr deployments trigger -p <projectId> -e <envId>
```

Open the environment URL: the page loads from the CDN and shows the message fetched from
`/api/hello`.
