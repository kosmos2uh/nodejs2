const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    path: String,
    name: String
  },
  {
    collection: 'images'
  }
);

imageSchema
.virtual('link')
.get(function () {
  return '/admin/gallery/'+this._id;
});

const Picture = mongoose.model('Picture', imageSchema);
module.exports = Picture;
