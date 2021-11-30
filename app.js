const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const PORT = 5001;

mongoose.connect(MONGOURI);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("Error: ", err);
});

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
