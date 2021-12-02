const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("Welcome Home");
});

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

module.exports = router;
