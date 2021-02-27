const express = require('express');

const fs = require('fs');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3002; 

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './develop/public/index.html'));
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './develop/public/notes.html'));
})

// Leave this at the bottom
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});