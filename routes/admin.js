const router = require('express').Router();
const controllers = require('../controllers/admin');

router.get('/', controllers.dashboard_controller.index);

router.get('/post/create', controllers.posts_controller.post_create_get);

router.post('/post/create', controllers.posts_controller.post_create_post);

router.get('/post/:id/delete', controllers.posts_controller.post_delete_get);

router.post('/post/:id/delete', controllers.posts_controller.post_delete_post);

router.get('/post/:id/update', controllers.posts_controller.post_update_get);

router.post('/post/:id/update', controllers.posts_controller.post_update_post);

router.get('/post/:id', controllers.posts_controller.post_detail);

router.get('/posts', controllers.posts_controller.index);

router.get('/users', controllers.users_controller.index);
router.get('/user/:id/update', controllers.users_controller.user_update_get);
router.post('/user/:id/update', controllers.users_controller.user_update_post);
router.get('/user/:id/delete', controllers.users_controller.user_delete_get);
router.post('/user/:id/delete', controllers.users_controller.user_delete_post);

router.get('/categories', controllers.categories_controller.category_index);
router.get('/category/create', controllers.categories_controller.category_create_get);
router.post('/category/create', controllers.categories_controller.category_create_post);
router.get('/category/:id', controllers.categories_controller.category_detail);
router.get('/category/:id/delete', controllers.categories_controller.category_delete_get);
router.post('/category/:id/delete', controllers.categories_controller.category_delete_post);
router.get('/category/:id/update', controllers.categories_controller.category_update_get);
router.post('/category/:id/update', controllers.categories_controller.category_update_post);

module.exports = router;
