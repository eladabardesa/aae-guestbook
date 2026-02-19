/**
 * Minimal static server for Railway.
 * Listens on 0.0.0.0 and PORT so the platform can reach the app.
 */
const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;

// Health check (Railway / load balancers often hit this first)
app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.use(express.static(ROOT));

// SPA fallback: unknown paths serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

// Log so deploy logs show the port Railway gave us
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${PORT} (PORT=${process.env.PORT})`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
