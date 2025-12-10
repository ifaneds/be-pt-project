import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes for HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/contact.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
