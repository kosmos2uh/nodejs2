const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    title:  { type: String, required: true },
    content: { type: String, required: true},
    status: {
      type: String,
      enum: ['published', 'private', 'draft'],
      default: 'draft'
    },

    hidden: {
      type: Boolean,
      default: false
    },

    meta: {
        votes: Number,
        favs:  Number
    },

    thumbnail: Buffer,

    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    comments: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
      },
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: {
                type: Date,
                default: Date.now
            }
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

postSchema
    .virtual('url')
    .get(function () {
      return '/admin/post/'+this._id;
    });


const Post = mongoose.model('Post', postSchema);
module.exports = Post;
