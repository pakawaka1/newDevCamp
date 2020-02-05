const express = require('express');
//dotenv for env - not needed for vehicles

const dotenv = require('dotenv');

// logger from npm (not needed for vehicles)
const morgan = require('morgan');
// logger middleware (not needed for vehicles)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Route files

const bootcamps = require('./routes/bootcamps');

// Load env vars (not needed for vehicles)
dotenv.config({ path: './config/config.env' });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers

app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
