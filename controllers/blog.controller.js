const models = require('../models');
const async = require('async');

module.exports = {

  index: (req, res, next) => {

    models.Post.find()
      .sort([['title', 'ascending']])
      .exec((err, posts) => {
        if (err) {
          return next(err);
          }

        res.render('blog/index',
          {
            title: 'Posts List',
            posts: posts,

          });
    });
  },

  show: (req, res) => {
    async.parallel({
      post: (callback) => {
        models.Post.findById(req.params.id)
        .populate('category')
        .populate('comments')
        .exec(callback);
      },
    },
      (err, results) => {
        if (err) {
            return next(err);
        }
        res.render('blog/show',
            {
              title: 'Post Detail',
              post:  results.post,
              comments:  results.comments,
              csrf: req.csrfToken()
            });
    });

  },

}
