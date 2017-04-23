let mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
	text: String,
	author: String
})

// compile class to construct db documents
// will pluralise 'Campground' and create collection called 'campgrounds' in db.
module.exports = mongoose.model('Comment', commentSchema)
