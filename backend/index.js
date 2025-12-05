require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Models/db'); 
const AuthRouter = require('./Routers/AuthRouter');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Example test route
app.get('/ping', (req, res) => res.send('PONG'));

// Auth Routes
app.use('/auth', AuthRouter);

// Connect DB then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Could not start server because DB connection failed');
    process.exit(1);
  });
