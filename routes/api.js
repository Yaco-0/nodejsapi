const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/users',userController.users_list);
router.post('/userRegister',userController.user_add);
router.post('/userLogin',userController.user_login)
module.exports = router;