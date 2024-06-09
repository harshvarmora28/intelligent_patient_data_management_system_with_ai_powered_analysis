const express = require('express');
const {
	createUser,
	login,
	fetchUserData,
	getDoctorList,
	getPatientList,
} = require('../controller/user.controller');
const { verifyToken } = require('../middleware/token');
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', login);
router.get('/:id', verifyToken, fetchUserData);
router.get('/users/doctors', getDoctorList);
router.get('/users/patients', getPatientList);

module.exports = router;
