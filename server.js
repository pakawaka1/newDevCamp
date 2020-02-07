const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars (not needed for vehicles)
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();

// Route filesß
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(err);
  console.log(`Error: ${err.message}`);
  // Close server and exits process
  server.close(() => process.exit(1));
});
