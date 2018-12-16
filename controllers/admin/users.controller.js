const models = require("../../models");

let async = require('async');

module.exports = {

index: (req, res, next) => {

  models.User.find()
    .sort([['email', 'ascending']])
    .exec((err, users) => {
      if (err) { 
        return next(err); 
        }
      res.render('admin/users/index', 
        { 
          title: 'Users List', 
          users: users, 
          breadcrumb: 'Users List'
        });
  });
},

user_delete_get: function(req, res, next) {

   models.User.findById(req.params.id, (err, user) => {
    if (err) { 
        return next(err); 
    }
    res.render('admin/users/delete', 
      { 
          title: 'Delete user', 
          csrf: req.csrfToken(),
          user: user 
      });
   });
},

user_delete_post: function(req, res, next) {

   models.User.findByIdAndRemove(req.body.id, function deleteUser(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/admin/users');
      });
},

user_update_get: function(req, res, next) {
    req.sanitize('id').escape();
    req.sanitize('id').trim();

    models.User.findById(req.params.id, (err, user) => {
        if (err) { 
            return next(err); 
        }
             
        if (user.isVerified==true) {
          user.checked=true;
         }

        res.render('admin/users/form', 
          { 
            title: 'Update User', 
            breadcrumb: 'Edit User', 
            csrf: req.csrfToken(),
            user: user 
          });
    });
},

user_update_post: (req, res, next) => {
    req.sanitize('id').escape();
    req.sanitize('id').trim();
    req.checkBody('email', 'Email must not be empty.').notEmpty();
    req.sanitize('email').escape();
    req.sanitize('email').trim();
   
    let user = new models.User(
      { email: req.body.email,
        roles: [req.body.roles],
        profile:  {
                name: req.body.name || null
            },
       _id: req.params.id,
       isVerified: (req.body.isVerified==='on')?true:false
       });

    let errors = req.validationErrors();

    if (errors) {
        res.render('admin/users/form', { title: 'Update User', user: user, errors: errors });
        }
    else{
         models.User.findByIdAndUpdate(req.params.id, user, {},  (err) => {
            
            if (err) { 
                return next(err); 
            }
               // res.redirect(theuser.url);
               res.redirect('/admin/users');
            });
        }
    },
};
