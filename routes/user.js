const router = require('express').Router();
const controllers = require('../controllers');
const authentication = require('../middleware/authentication');

router.get('/login', controllers.auth_controller.login.get);
router.post('/login', controllers.auth_controller.login.post);
router.get('/register', controllers.auth_controller.register.get);
router.post('/register', controllers.auth_controller.register.post);
router.get('/logout', authentication.isAuthenticated, controllers.auth_controller.logout.get);

module.exports = router;
