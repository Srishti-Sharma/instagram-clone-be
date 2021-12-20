const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

const requireLogin = require("../middleware/requireLogin");

router.post("/signup", (req, res) => {
  const { email, name, password } = req.body;
  // console.log("req.body ", req.body);
  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ error: "Require all fields: name, email and password" });
  }
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(422)
          .json({ error: "User already exists with the entered email" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Saved successfully" });
          })
          .catch((err) => {
            console.log("Error ", err);
          });
      });
    })
    .catch((error) => {
      console.log("Error ", error);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "Please add email and password" });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid email or password" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((didPasswordMatch) => {
          if (didPasswordMatch) {
            // res.json({ message: "Signin success" });
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            res.json({ token });
          } else {
            res.status(422).json({ error: "Invalid email or password" });
          }
        })
        .catch((error) => {
          console.log("catched error: ", error);
        });
    })
    .catch((error) => {
      console.log("inside catch ", error);
    });
});

module.exports = router;
