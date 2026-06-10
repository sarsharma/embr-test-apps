// Minimal Express backend. It owns the /api/* routes (see run.routePrefixes in embr.yaml);
// everything else on the same URL is served from the static frontend (apps/web) via the CDN.
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Liveness probe used by Embr (healthCheck.path in embr.yaml).
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Example API the frontend calls (same-origin, so just /api/hello — no CORS, no base URL).
app.get('/api/hello', (_req, res) => {
  res.json({
    message: 'Hello from the Embr backend 👋',
    time: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
