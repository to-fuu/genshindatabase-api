const express = require("express");
const app = express();
const path = require("path");

const charData = require("./data/characters.json");
const artifactData = require("./data/artifacts.json");
const materialData = require("./data/materials.json");
const weaponData = require("./data/weapons.json");
const constellations = require("./data/Constellations.json");

const axios = require("axios");
var bodyParser = require("body-parser");
const { json } = require("body-parser");
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname + "/docs.html"));
});

//api version
app.get("/version", (req, res) => {
  res.send({
    version: 0.1,
    description: "test version",
    gameVersion: "1.2",
    currentBannerEndTime: "02 Feb 2021 15:00",
    currentCharacterBannerName: "Adrift in the Harbor",
    currentWeaponBannerName: "Epitome Invocation",
  });
});

//CHARACTERS
app.get("/characters", (req, res) => {
  console.log(req.query.name);

  if (req.query.name == undefined) res.send(charData.characters);
  else
    res.send(
      charData.characters.filter(function (item) {
        return item.name.toLowerCase() === req.query.name.toLowerCase();
      })[0]
    );
});

app.get("/characters/featured", (req, res) => {
  var name = req.params.name;

  if (req.query.name == undefined)
    res.send(
      charData.characters.filter(function (item) {
        return item.featured;
      })
    );
  else
    res.send(
      charData.characters.filter(function (item) {
        return (
          item.featured &&
          item.name.toLowerCase() === req.query.name.toLowerCase()
        );
      })[0]
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

app.get("/characters/weapons/:type", (req, res) => {
  var type = req.params.type;

  res.send(
    charData.characters.filter(function (item) {
      return item.weaponType.toLowerCase() === type.toLowerCase();
    })
  );
});

app.get("/characters/role/:role", (req, res) => {
  var role = req.params.role;

  if (role === "dps") role = "maindps";
  else if (role === "support") role = "supportdps";

  res.send(
    charData.characters.filter(function (item) {
      return item.role.toLowerCase() == role.toLowerCase();
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

//CHARACTERS
app.get("/constellations", (req, res) => {
  if (req.query.name == undefined) res.send(constellations.Constellations);
  else {
    const qr = constellations.Constellations.filter(function (item) {
      return item.name.toLowerCase() === req.query.name.toLowerCase();
    })[0];

    const result = {
      c1: qr.c1,
      c2: qr.c2,
      c3: qr.c3,
      c4: qr.c4,
      c5: qr.c5,
      c6: qr.c6,
    };

    res.send(result);
  }
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/", function (request, response) {
  console.log(request.body); // your JSON
  response.send(request.body); // echo the result back

  axios
    .post("http://localhost:5000", request.body)
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
});

// app.post("/", (req, res) => {
//   res.send("received " + req.body);
//   axios
//     .post("http://localhost:5000", req.body)
//     .then((res) => {
//       console.log(`statusCode: ${res.statusCode}`);
//       console.log(res);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

app.use(express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`example app is listening on port ${port}`);
});
