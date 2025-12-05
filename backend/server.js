import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';
import commentRoutes from './routes/comment.routes.js';
import locationRoutes from './routes/location.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------
// Middleware
// ----------------------
app.use(cors({
  origin: "https://salah-sarl-qrwf-n8a7adyk9-zougmars-projects.vercel.app/" || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------
// Default Route for Railway
// ----------------------
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ----------------------
// API Routes
// ----------------------
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ----------------------
// Error Handling
// ----------------------
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ----------------------
// 404 Handler
// ----------------------
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ----------------------
// MongoDB Connection
// ----------------------
const mongoUri = process.env.MONGO_URI;
const mongoDbName = process.env.MONGO_DB_NAME || 'db1';

let mongoConnectionString;

// No MONGO_URI -> local DB
if (!mongoUri) {
  mongoConnectionString = `mongodb://localhost:27017/${mongoDbName}`;
}

// MongoDB Atlas (srv)
else if (mongoUri.includes('mongodb+srv')) {
  const urlParts = mongoUri.split('?');
  const baseUri = urlParts[0];
  const queryString = urlParts[1] ? `?${urlParts[1]}` : '';

  const pathParts = baseUri.split('/');

  if (pathParts.length > 3 && pathParts[3].trim() !== '') {
    mongoConnectionString = mongoUri;
  } else {
    mongoConnectionString = `${baseUri}/${mongoDbName}${queryString}`;
  }
}

// Local connection with custom URI
else {
  if (mongoUri.includes('/') && mongoUri.split('/').length > 3) {
    const lastPart = mongoUri.split('/').pop();
    if (lastPart && !lastPart.includes('?')) {
      mongoConnectionString = mongoUri;
    } else {
      mongoConnectionString = mongoUri.includes('?')
        ? mongoUri.replace('?', `/${mongoDbName}?`)
        : `${mongoUri}/${mongoDbName}`;
    }
  } else {
    mongoConnectionString = `${mongoUri}/${mongoDbName}`;
  }
}

// ----------------------
// Start Server & Connect DB
// ----------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  mongoose.connect(mongoConnectionString, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    dbName: mongoDbName,
  })
  .then(() => {
    console.log(`✅ Connected to MongoDB (Database: ${mongoDbName})`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
});

export default app;
