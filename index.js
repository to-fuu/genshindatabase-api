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

app.get("/characters/:name", (req, res) => {
  var name = req.params.name;

  res.send(
    charData.characters.filter(function (item) {
      return item.name.toLowerCase() === name.toLowerCase();
    })
  );
});

app.get("/characters/elements/:element", (req, res) => {
  var element = req.params.element;

  res.send(
    charData.characters.filter(function (item) {
      return item.elementType.toLowerCase() === element.toLowerCase();
    })
  );
});

app.listen(port, () => {
  console.log(`example app is listening on port ${port}`);
});
