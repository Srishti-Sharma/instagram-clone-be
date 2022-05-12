const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

const requireLogin = require("../middleware/requireLogin");

// for getting all posts
router.get("/allposts", requireLogin, (req, res) => {
  //  populateBy is a method used to get data instead of ObjectId.
  //  It allows us to pass the expected field-names as second parameter
  //  otherwise will return the full record entry
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      return res.json({ posts });
    })
    .catch((err) => {
      return res.json({ error: err });
    });
});

// for creating a post
router.post("/createpost", requireLogin, (req, res) => {
  const { title, description, image_url } = req.body;
  if (!title || !description || !image_url) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    description,
    photo: image_url,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => res.json({ post: result }))
    .catch((error) => console.log("error: ", error));
});

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => res.json({ mypost }))
    .catch((err) => console.log(err));
});
module.exports = router;
