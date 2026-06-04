const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (_req, res) => {
  res.send(`custom build OK — running on Node ${process.version}`);
});

app.listen(port, () => {
  console.log(`listening on ${port} (Node ${process.version})`);
});
