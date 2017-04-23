let mongoose = require('mongoose');

let campgroundSchema = mongoose.Schema({
	name: String,
	image: String,
  description: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
})

// compile class to construct db documents
// will pluralise 'Campground' and create collection called 'campgrounds' in db.
module.exports = mongoose.model('Campground', campgroundSchema)
