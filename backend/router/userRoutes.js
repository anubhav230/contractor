const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

// Define routes for user operations
router.get('/Login/:username', userController.getUserById);
router.get('/getContractor', userController.getContractor);
router.post('/createContract', userController.createContract);
router.post('/updateContract', userController.updateContract);

router.get('/getAppContracts', userController.getAppContracts);


router.get('/getContracts/:contractor_id', userController.getContracts);




module.exports = router;