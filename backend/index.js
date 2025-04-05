const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const donationRoutes = require('./routes/donationRoutes');
const shiftAssignmentRoutes = require('./routes/shiftAssignmentRoutes');
const pool = require('./config/db.js');
const { authRouter } = require('./routes/auth');


dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', shiftRoutes);
app.use('/api', donationRoutes);
app.use('/api', shiftAssignmentRoutes);

app.use('/backend/routes/auth', authRouter);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
