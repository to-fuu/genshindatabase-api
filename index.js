const express = require("express");
const app = express();

const charData = require("./characters.json");

let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("HelloWorld");
});

app.get("/characters", (req, res) => {
  res.send(charData);
});

app.listen(port, () => {
  console.log(`example app is listening on port ${port}`);
});
