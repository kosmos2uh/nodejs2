const router = require('express').Router();
const acl = require('../middleware/acl');

router.use('/', require('./web'));
router.use('/blog', require('./blog'));
router.use('/admin', [acl.check], require('./admin'));
// router.use('/admin', require('./admin'));
router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/contact', require('./contact'));

module.exports = router;