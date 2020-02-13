const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');

// include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// reroute into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/:id/photo').put(bootcampPhotoUpload);

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
