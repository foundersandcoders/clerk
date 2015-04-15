"use strict";

var server = require("./lib/server.js");

server.start(function () {

  console.log("clerk started on " + server.info.port);
});
