const express = require("express");
const app = express();
const path = require("path");

const charData = require("./characters.json");
const artifactData = require("./artifacts.json");
const materialData = require("./materials.json");
const weaponData = require("./weapons.json");

let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

//CHARACTERS

app.get("/characters", (req, res) => {
  res.send(charData.characters);
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

app.get("/characters/rarity/:rarity", (req, res) => {
  var rarity = req.params.rarity;

  res.send(
    charData.characters.filter(function (item) {
      return item.rarity == rarity;
    })
  );
});

//ARTIFACTS
app.get("/artifacts", (req, res) => {
  res.send(artifactData.artifacts);
});

app.get("/artifacts/:name", (req, res) => {
  var name = req.params.name;

  res.send(
    artifactData.artifacts.filter(function (item) {
      return item.key.toLowerCase() === name.toLowerCase();
    })
  );
});

app.get("/artifacts/elements/:element", (req, res) => {
  var element = req.params.element;

  res.send(
    artifactData.artifacts.filter(function (item) {
      return item.element.toLowerCase() === element.toLowerCase();
    })
  );
});

app.get("/artifacts/rarity/:rarity", (req, res) => {
  var rarity = req.params.rarity;

  if (rarity != 4 && rarity != 5) {
    res.status(404).send("Not found");
    return;
  }
  res.send(
    artifactData.artifacts.filter(function (item) {
      return item.rarityMax == rarity;
    })
  );
});

//ARTIFACTS
app.get("/weapons", (req, res) => {
  res.send("add a waepon type");
});

app.get(["/weapons/bow", "/weapons/bows"], (req, res) => {
  res.send(weaponData.bows);
});

app.get(["/weapons/swords", "/weapons/sword"], (req, res) => {
  res.send(weaponData.swords);
});

app.get(["/weapons/claymores", "/weapons/claymore"], (req, res) => {
  res.send(weaponData.claymores);
});

app.get(["/weapons/catalysts", "/weapons/catalyst"], (req, res) => {
  res.send(weaponData.catalysts);
});

app.get(["/weapons/polearms", "/weapons/polearm"], (req, res) => {
  res.send(weaponData.polearms);
});

app.use(express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`example app is listening on port ${port}`);
});
