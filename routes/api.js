const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/users',userController.users_list);
router.post('/userAdd',userController.user_add);
module.exports = router;