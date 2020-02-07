const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require('../controllers/bootcamps');

const router = express.Router();

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getBootcamps)
  .post(protect, createBootcamp);

router
  .route('/:id')
  .get(protect, getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
