const express = require("express"),
  ejs = require("ejs"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require('./models/campgrounds'),
  Comment = require('./models/comment'),
  seedDB = require('./seeds');
seedDB();

let app = express();

app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/yelp-camp");



// set up routes

app.get("/", (req, res) => {
  res.render("home")
})





// RESTful conventions to keep .get and .post on same route
// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", (req, res) => {
  // get all campgrounds from DB
  Campground.find({}, (err, allcampgrounds) => {
    if (err) {
      return console.log(err)
    } else {
      res.render("campgrounds/campgrounds", {
        campgrounds: allcampgrounds
      })

    }
  })
})
//CREATE ROUTE - add new campground to DB
app.post("/campgrounds", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;

  Campground.create({
    name: name,
    image: image,
    description: description
  }, (err, campground) => {
    if (err) return console.log(err)
    console.log("SUCCESS CAMPGROUND ADDED: " + campground)
  })

  // campgrounds.push({name:name, image:image})
  res.redirect("/campgrounds")
  // get data from form and add to campgrounds array
  // redirect back to campgrounds page

}) // end POST route


// NEW ROUTE - display form to add new campgrounds
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new")
})





// SHOW ROUTE - show page for id.
app.get("/campgrounds/:id", (req, res) => {

  // res.send("This will be the SHOW page for campground ID: " + id)

  // find the campground with supplied ID
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err) {
      console.log(err)
    } else {

      res.render("campgrounds/show", {
        campground: foundCampground
      })
    }


  })


})



// ============================
// COMMENTS ROUTE
// ============================
// ADD COMMENT ROUTE
app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      res.render("comments/new", {
        campground: campground
      });
    }
  })

})

app.post("/campgrounds/:id/comments", (req, res) => {
  console.log(req.params.id)
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      Comment.create({
        text: req.body.comment.text,
        author: req.body.comment.author
      }, (err, comment) => {
        campground.comments.push(comment);
        campground.save();
        res.redirect("/campgrounds/" + req.params.id)
      })
    }

  })









})



// set up listening

app.listen(3000, () => {
  console.log(`server started...http://localhost:3000/`)
})
