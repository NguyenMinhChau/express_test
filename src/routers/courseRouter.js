const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController');

router.get('/addCourse', courseController.AddCourse);
router.post('/create', courseController.CreateCourse);
router.get('/:slug', courseController.CourseDetail);

module.exports = router;
