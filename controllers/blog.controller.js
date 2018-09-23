const models = require('../models');
module.exports = {
    index: (req, res) => {
        res.render('blog/index', { title: 'Blog List', data: '' });
    },

    show: (req, res) => {
        models.Post.detail(req.params.id, (err, docs) => {
            res.render('blog/show', {
                title: 'Post Detail',
                post: docs
            });
        });
    },

}
