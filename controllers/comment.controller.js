const models = require("../models");
const Pusher = require('pusher');
const config = require('../config');

let pusher = new Pusher({
  appId: config.pusher.appId,
  key: config.pusher.key,
  secret: config.pusher.secret,
  cluster: 'eu',
  encrypted: true
});

exports.comment_post = (req, res, next) => {

    // сохренение комментов-то есть, но вывод сохраненных так и не допилен. ≈сли уж совсем невмоготу, можно попробовать допилить.
    let comment = new models.Comment(
      {
          author:{
              id: req.user._id,
              username: req.user.profile.name,
          },
          post: {
              id: req.body.post_id
          },
          content: req.body.comment
      });

        var errors = req.validationErrors();

      if (errors) {
        console.log('ERRORS: '+errors);
        }
      else {
        comment.save(function (err) {
            if (err) { return next(err); }
            console.log(comment);
            });
      }

    let newComment = {
      name: req.user.profile.name,
      // email: req.user.email,
      comment: req.body.comment,
      _csrf: req.body._csrf

    }
    pusher.trigger('flash-comments', 'new_comment', newComment);
    res.json({  created: true });
};
