const express = require('express');
const path = require('path');

// Create an Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 5000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve `index.html`
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
