const express = require('express');
const router = express.Router();
const { adminToken, employeeToken } = require('../utils/jwt');

const { getEmployees, getEmployee, postEmployee, putEmployee, deleteEmployee } = require('../controllers/employeeController');

router.get('/', adminToken, getEmployees)

router.get('/:id', employeeToken, getEmployee)

router.post('/', adminToken, postEmployee)

router.put('/:id', employeeToken, putEmployee)

router.delete('/:id', adminToken, deleteEmployee)

module.exports = router;