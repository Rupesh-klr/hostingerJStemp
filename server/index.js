const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve built React files
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// Example API route
app.get('/api/hello', (req, res) => {
 res.json({ message: 'Hello from Express on Hostinger!' });
});

// Fallback to index.html for React Router / SPA
app.get('*', (req, res) => {
 res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});