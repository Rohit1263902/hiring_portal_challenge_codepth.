const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bitcoin_saving_app', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());

// Dummy user for authentication
const user = {
  id: 1,
  username: 'user',
  password: 'password'
};

// Authenticate user and generate token
app.post('/api/authenticate', (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ userId: user.id }, 'secret_key');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware to check for token on protected routes
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Example CRUD routes for tasks
app.get('/api/tasks', authenticateToken, (req, res) => {
  // Retrieve tasks from MongoDB
  // Implement MongoDB queries here
  res.json({ tasks: [] });
});

app.post('/api/tasks', authenticateToken, (req, res) => {
  // Create a new task in MongoDB
  // Implement MongoDB queries here
  res.json({ message: 'Task created successfully' });
});

// Implement update and delete routes similarly

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
