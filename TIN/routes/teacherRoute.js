const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.showVehicleList);
router.get('/details/:texId', teacherController.shoeTeacherDetails);
router.get('/add', teacherController.showAddTeacherForm);
router.get('/edit/:texId', teacherController.showEditTeacherForm);

router.post('/add', teacherController.addTeacher);
router.post('/edit', teacherController.updateTeacher);
router.get('/delete/:texId', teacherController.deleteTeacher);

module.exports = router;