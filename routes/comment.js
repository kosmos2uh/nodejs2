const router = require('express').Router();
const controllers = require('../controllers');
router.post('/', controllers.comment_controller.comment_post);

module.exports = router;
