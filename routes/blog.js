const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.blog_controller.index);

router.get('/:id', controllers.blog_controller.show);

module.exports = router;
