let mongose = require('mongoose'),
    Campground = require('./models/campgrounds'),
    Comment = require('./models/comment');
let data = [
  {
    name: "Lakey Lake Camp",
    image: "https://farm7.staticflickr.com/6210/6090170567_6df55f8d83.jpg",
    description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
  },
  {
    name: "Golden Gums Camp",
    image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
    description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
  },
  {
    name: "Mosquito Bay",
    image: "https://farm6.staticflickr.com/5319/7407436246_0ac54dd559.jpg",
    description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
  },
  {
    name: "Tahini Reservoir Camp",
    image: "https://farm9.staticflickr.com/8023/7626458374_7ddea1aa2c.jpg",
    description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
  },
]

function seedDB(){
  // remove all campgrounds
  Campground.remove({}, (err) => {
    if(err) {
      console.log(err)
    }



    console.log("removed campgrounds")
    // add a few campgrounds
    data.forEach((campground) => {
      Campground.create(campground, (err, camp) => {
        if (err) {console.log(err)}
        else {
          console.log(campground + " Campground added");
          // Comment.create({
          //   text: "Great campground, sandflies were TERRIBLE!",
          //   author: "Bob"
          // }, (err, comment) => {
          //   if(err) {
          //     console.log(err)
          //   } else {
          //     camp.comments.push(comment);
          //     camp.save();
          //     console.log("Comment added")
          //   }
          // })


        }
      })
    }) // end forEach
  });





}

module.exports = seedDB;
