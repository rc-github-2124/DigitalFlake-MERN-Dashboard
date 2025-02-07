const express = require('express');
const {createUser,loginUser,getCurrentUser,verifyToken,forgotPassword,resetPassword,verifyResetToken} = require('../controllers/userController')
const router  =express.Router();


router.post('/',createUser);

router.post('/auth',loginUser);
router.get('/current-user',verifyToken,getCurrentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/verify-reset-token/:token', verifyResetToken);

module.exports = router;