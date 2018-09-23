const models = require('../../models');
module.exports = {

  index: (req, res) => {
    models.Post.all((err, docs) => {
        res.render('admin/blog/index', { 
            title: 'Post List',
            breadcrumb: 'Blog List',
            posts: docs 
        });
    });
  },

  show: (req, res) => {

    models.Post.detail(req.params.id, (err, docs) => {
        res.render('admin/blog/show', { 
            title: 'Post Detail',
            breadcrumb: 'Show Post',
            post: docs 
        });
    });
  },


  create: (req, res) => {
    res.render('admin/blog/create', { title: 'Add New Post', breadcrumb: 'New Post', data: '' });
  },

  store: (req, res) => {
    
    const post = { content: req.body.content, title: req.body.title, updated_at: new Date() };
    
    models.Post.store(post, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
        console.log('An error has occurred');
      } else {
        // res.send(result.ops[0]);
        return res.redirect('/admin/blog');
      }
        
    });
  },

  edit: (req, res) => {
    res.render('admin/blog/edit', { title: 'Edit Post', breadcrumb: 'Edit Post', data: '' });
  },
  
}