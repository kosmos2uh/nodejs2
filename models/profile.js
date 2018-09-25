const mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: String,
        lastName: String
    },
    biography: String,
    gender: String,
    location: String,
    website: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    profilePicture: Buffer,
    created: { 
        type: Date,
        default: Date.now
    }
});
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
