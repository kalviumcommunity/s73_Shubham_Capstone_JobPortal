const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Debugging: Log the MongoDB URI
console.log("MongoDB URI:", process.env.MONGODB_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Root Route to Fix "Cannot GET /" Error
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API');
});

// ✅ Job Routes (Make sure this file exists!)
app.use('/api/jobs', require('./routes/jobs'));

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
