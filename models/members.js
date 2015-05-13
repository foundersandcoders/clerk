"use strict";

module.exports = require("arrested")({
  url: process.env.BEEKEEPER || "http://0.0.0.0:8010",
  collection: "members"
});
