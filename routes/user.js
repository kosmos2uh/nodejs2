const router = require('express').Router();
const controllers = require('../controllers');
const authentication = require('../middleware/authentication');

router.get('/login', controllers.auth_controller.login.get);
router.post('/login', controllers.auth_controller.login.post);
router.get('/register', controllers.auth_controller.register.get);
router.post('/register', controllers.auth_controller.register.post);
router.get('/logout', authentication.isAuthenticated, controllers.auth_controller.logout.get);

router.get('/verify/:verificationToken', controllers.auth_controller.verify.get);
router.get('/verify-resend/:email?', controllers.auth_controller.verifyResend.get);
router.post('/verify-resend', controllers.auth_controller.verifyResend.post);
router.get('/forgot', controllers.auth_controller.forgotPassword.get);
router.post('/forgot', controllers.auth_controller.forgotPassword.post);
router.get('/reset-password/:passwordResetToken', controllers.auth_controller.resetPassword.get);
router.post('/reset-password/:passwordResetToken', controllers.auth_controller.resetPassword.post);

router.get('/change-password', authentication.isAuthenticated, controllers.auth_controller.changePassword.get);
router.post('/change-password', authentication.isAuthenticated, controllers.auth_controller.changePassword.post);

module.exports = router;
