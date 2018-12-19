const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.blog_controller.index);

router.post('/comment', controllers.comment_controller.comment_post);
router.get('/:id', controllers.blog_controller.show);

module.exports = router;
