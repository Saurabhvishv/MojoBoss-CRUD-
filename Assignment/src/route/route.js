const express = require('express');

const router = express.Router();

const employeeController = require('../controller/employeeController');
const middleware = require('../middleware/middleware')

router.post('/register', employeeController.registerEmployee);
router.post('/login', employeeController.loginEmployee);
router.get('/fetch', employeeController.getEmployee);
router.get('/fetch/:employeeId', middleware.employeeAuth,employeeController.getEmployeeById);
router.post('/update/:employeeId', middleware.employeeAuth,employeeController.updateEmployee);
router.delete('/delete/:employeeId', middleware.employeeAuth,employeeController.deleteEmployee);

module.exports = router;