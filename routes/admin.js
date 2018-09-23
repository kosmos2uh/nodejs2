const router = require('express').Router();
const controllers = require('../controllers/admin');

router.get('/', controllers.dashboard_controller.index);

router.get('/blog', controllers.blog_controller.index);

router.get('/blog/create', controllers.blog_controller.create);

router.post('/blog/create', controllers.blog_controller.store);

router.get('/blog/edit', controllers.blog_controller.edit);

router.get('/blog/:id', controllers.blog_controller.show);


module.exports = router;
