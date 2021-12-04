const express = require('express');
const router = express.Router();
const meController = require('../controllers/MeController');

router.get('/destroy', meController.listCourseMeDestroy);
router.get('/edit/:id', meController.listCourseMeUpdate);
router.put('/updated/:id', meController.listCourseMeUpdated);
router.patch('/restore/:id', meController.listCourseMeRestore);
router.delete('/delete/:id', meController.deleteCourseMe);
router.delete('/destroy/:id', meController.destroyCourseMe);
router.post('/handleAction', meController.handleAction);
router.post('/handleActionDestroy', meController.handleActionDestroy);
router.get('/', meController.listCourseMe);

module.exports = router;
