const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

const requireLogin = require("../middleware/requireLogin");

router.post("/createpost", requireLogin, (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    description,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => res.json({ post: result }))
    .catch((error) => console.log("error: ", error));
});

module.exports = router;
