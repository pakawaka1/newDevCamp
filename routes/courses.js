const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

const Course = require('../models/Course');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getCourses)
  .post(protect, createCourse);

router
  .route('/:id')
  .get(protect, getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
