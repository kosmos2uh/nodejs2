const models = require("../../models");

let async = require('async');

module.exports = {

// index: function(req, res) {

//     async.parallel({
//         post_count: function(callback) {
//             models.Post.count(callback);
//         },
//         category_count: function(callback) {
//             models.Category.count(callback);
//         },
//     }, function(err, results) {
//         res.render('admin/index', { title: 'Janus Blog', error: err, data: results });
//     });
// },


index: (req, res, next) => {

  models.Post.find()
    .sort([['title', 'ascending']])
    .exec((err, post_list) => {
      if (err) { 
        return next(err); 
        }
      res.render('admin/posts/index', 
        { 
          title: 'Posts List', 
          post_list: post_list, 
          breadcrumb: 'Posts List'
        });
  });
},

post_detail: (req, res, next) => {

    async.parallel({
      post: (callback) => {
        models.Post.findById(req.params.id)
        .populate('category')
        .exec(callback);
      },
    }, 
      (err, results) => {
        if (err) { 
            return next(err); 
        }
        res.render('admin/posts/detail', 
            { 
              title: 'Post Detail', 
              post:  results.post,
              breadcrumb: 'Post Detail'
            });
    });
},

post_create_get: (req, res, next) => {

    async.parallel({
        categories: (callback) => {
            models.Category.find(callback);
        },
    }, (err, results) => {
        if (err) { 
            return next(err); 
        }
        res.render('admin/posts/form', 
          { 
            title: 'Create New Post', 
            categories:results.categories,
            breadcrumb: 'Create New Post' 
          });
    });
},

post_create_post: function(req, res, next) {
    req.checkBody('title', 'Title must not be empty.').notEmpty();
    req.checkBody('content', 'Content must not be empty').notEmpty();
    req.sanitize('title').escape();
    req.sanitize('content').escape();
    req.sanitize('title').trim();
    req.sanitize('content').trim();
    req.sanitize('category').escape();

    var post = new models.Post(
      { title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        category: (typeof req.body.category==='undefined') ? [] : req.body.category.split(",")
       });

    console.log('post: '+post);

    var errors = req.validationErrors();
    if (errors) {
        console.log('category: '+req.body.category);

        console.log('ERRORS: '+errors);

        async.parallel({
            categories: function(callback) {
                models.Category.find(callback);
            },
        }, function(err, results) {
            if (err) { return next(err); }

            for (i = 0; i < results.categories.length; i++) {
                if (post.category.indexOf(results.categories[i]._id) > -1) {
                    results.categories[i].checked='true';
                }
            }

            res.render('admin/posts/form', { title: 'Create Post', categories:results.categories, post: post, errors: errors });
        });

    }
    else {
        post.save(function (err) {
            if (err) { return next(err); }
               res.redirect(post.url);
            });
    }

},

post_delete_get: function(req, res, next) {

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id).populate('category').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('admin/posts/delete', { title: 'Delete post', post: results.post } );
    });

},

post_delete_post: function(req, res, next) {

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id).populate('category').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }

            models.Post.findByIdAndRemove(req.body.id, function deletePost(err) {
                if (err) { return next(err); }
                res.redirect('/admin/posts');
            });
    });

},

post_update_get: function(req, res, next) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id).populate('category').exec(callback);
        },
        categories: function(callback) {
            models.Category.find(callback);
        },
        }, function(err, results) {
            if (err) { return next(err); }

            for (var all_g_iter = 0; all_g_iter < results.categories.length; all_g_iter++) {
                for (var post_g_iter = 0; post_g_iter < results.post.category.length; post_g_iter++) {
                    if (results.categories[all_g_iter]._id.toString()==results.post.category[post_g_iter]._id.toString()) {
                        results.categories[all_g_iter].checked='true';
                    }
                }
            }

            res.render('admin/posts/form', { title: 'Update post', categories:results.categories, post: results.post });
        });

},

post_update_post: function(req, res, next) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();

    req.checkBody('title', 'Title must not be empty.').notEmpty();
    req.checkBody('content', 'Summary must not be empty').notEmpty();

    req.sanitize('title').escape();
    req.sanitize('content').escape();
    req.sanitize('title').trim();
    req.sanitize('content').trim();
    req.sanitize('status').escape();
    req.sanitize('category').escape();



    var post = new models.Post(
      { title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        category: (typeof req.body.category==='undefined') ? [] : req.body.category.split(","),
        _id:req.params.id
       });
    

    
    var errors = req.validationErrors();
    if (errors) {
        async.parallel({
            categories: function(callback) {
                models.Category.find(callback);
            },
        }, function(err, results) {
            if (err) { return next(err); }

            for (i = 0; i < results.categories.length; i++) {
                if (post.category.indexOf(results.categories[i]._id) > -1) {
                    results.categories[i].checked='true';
                }
            }
            res.render('admin/posts/form', { title: 'Update post',categories:results.categories, post: post, errors: errors });
        });

    }
    else {
        models.Post.findByIdAndUpdate(req.params.id, post, {}, function (err,thepost) {
            if (err) { return next(err); }
               res.redirect(thepost.url);
            });
    }

},
};
