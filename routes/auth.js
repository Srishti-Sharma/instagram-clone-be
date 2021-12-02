const express = require("express");
const router = express.Router();

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
  return res.json({ message: "Signup success" });
});

module.exports = router;
