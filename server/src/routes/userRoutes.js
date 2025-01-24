const express = require('express');
const {createUser,loginUser,getCurrentUser,verifyToken} = require('../controllers/userController')
const router  =express.Router();


router.post('/',createUser);

router.post('/auth',loginUser);
router.get('/current-user',verifyToken,getCurrentUser);


module.exports = router;