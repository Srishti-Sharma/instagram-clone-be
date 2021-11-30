const express = require("express");
const app = express();

const PORT = 5001;
// FwBsfbMYIN3ySYaD

const customMiddleware = (req, res, next) => {
  console.log("Custom middleware");
  next();
};
// We can use middleware as to check if user is authenticated or not
// app.use(customMiddleware);

app.get("/", (req, res) => {
  console.log("root log");
  res.send("Hello World");
});

app.get("/about", customMiddleware, (req, res) => {
  console.log("about log");
  res.send("Welcome to Instagram clone");
});

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
