const models = require('../../models');
const async = require('async');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');


exports.images_index = (req, res, next) => {
  models.Picture.find()
    .sort([['name', 'ascending']])
    .exec((err, imagesList) => {
      if (err) {
        return next(err);
      }
      _.map(imagesList, (v)=>{v.path = '/uploads/' + v.path; return v;});
      res.render('admin/gallery/index', {
        title: 'Images List',
        breadcrumb: 'Images List',
        images: imagesList,
      });
    });
};

exports.image_create_get = (req, res) => {
  res.render('admin/gallery/form',
  {
    title: 'Create Image',
    breadcrumb: 'Add New Picture',
    csrf: req.csrfToken()
  });
};

exports.image_create_post = (req, res, next) => {

    let image = new models.Picture();

    image.name = req.body.name;
    image.path = req.file.filename;
  	image.save(function (err) {
  		if (err) return next(err)
  		res.redirect('/admin/gallery');
  	});

    // models.Picture.find({}, function(err, foundImage) {
  	// 	if (!foundImage.length) {
  	// 		image.name = req.body.name
  	// 		image.path = req.file.filename
  	// 		image.save(function(err) {
  	// 			if (err) {
    //         return next(err);
    //       }
    //       console.log("Save image");
  	// 			res.redirect('/admin/gallery')
  	// 		});
  	// 	} else {
  		// 	fs.unlink(path.join(__dirname, '../public/uploads') + foundImage[0].path, function(err) {
  		// 		models.Picture.remove({}, function(err, removed) {
  		// 			if (err) {
      //         return next(err);
      //       }
  		// 			image.name = req.body.name;
  		// 			image.path = req.file.filename;
  		// 			image.save(function(err) {
  		// 				if (err) return next(err)
  		// 				res.redirect('/admin/gallery');
  		// 			});
  		// 		});
  		// 	});
  		// }
  	// });
  };


exports.image_detail = (req, res, next) => {
        models.Picture.findById(req.params.id)
          .sort([['name', 'ascending']])
          .exec(function (err, image_item) {
            if (err) { return next(err); }
            res.render('admin/gallery/detail', { title: 'Title', image:  image_item });
        });
  };

  exports.image_delete_get = (req, res, next) => {
      async.parallel({
          image: (callback) => {
              models.Picture.findById(req.params.id).exec(callback);
          }
      },
      (err, results) => {
          if (err) { return next(err); }
          res.render('admin/gallery/delete', { title: 'Delete Image', image: results.image, csrf: req.csrfToken() } );
      });
  };

  exports.image_delete_post = (req, res, next) => {
      req.checkBody('id', 'Image id must exist').notEmpty();
      async.parallel({
          image: (callback) => {
              models.Picture.findById(req.params.id).exec(callback);
          }
      }, (err, results) => {
          if (err) { return next(err); }
          else {
              models.Picture.findByIdAndRemove(req.body.id, function deleteImage(err, foundImage) {
                  if (err) { return next(err); }
                  fs.unlink(path.join(__dirname, '../../public/uploads/') + foundImage.path, function(err){
                      if (err) { return next(err); }
                  });
                  res.redirect('/admin/gallery');
              });
          }
      });
  };

  exports.image_update_get = (req, res, next) => {
      req.sanitize('id').escape();
      req.sanitize('id').trim();
      models.Picture.findById(req.params.id, (err, image) => {
          if (err) { return next(err); }
          res.render('admin/gallery/form', { title: 'Update Image', image: image, breadcrumb: 'Update Picture', csrf: req.csrfToken() });
      });
  };


  exports.image_update_post = (req, res, next) => {
      req.sanitize('id').escape();
      req.sanitize('id').trim();

      req.checkBody('name', 'Image title required').notEmpty();

      var errors = req.validationErrors();

      var need_update_image = false;

      var image = new models.Picture(
        {
        name: req.body.name,
        _id: req.params.id
        }
      );
      if(undefined !== req.file){
          image.path = req.file.filename;
          need_update_image = true;
      }

      if (errors) {
          res.render('admin/gallery/form', { title: 'Update Image', image: image, errors: errors});
          return;
      } else {
          if(need_update_image){
              models.Picture.findById(req.params.id, function(err, img){
                  if (err) { return next(err); }
                  fs.unlink(path.join(__dirname, '../../public/uploads/') + img.path, function(err){
                      if (err) { return next(err); }
                  });
              });
          }
          models.Picture.findByIdAndUpdate(req.params.id, image, {},  (err,thecategory) => {
              if (err) { return next(err); }
              res.redirect(thecategory.link);
          });
      }
  };
