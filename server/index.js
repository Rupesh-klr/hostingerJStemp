const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Example API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express on Hostinger!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', NODE_ENV: process.env.NODE_ENV || 'development' });
});

// Serve client build only in production when it exists
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));

  // Fallback for SPA routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  console.log(`Not serving client files (NODE_ENV=${process.env.NODE_ENV || 'development'}) - development mode`);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
});