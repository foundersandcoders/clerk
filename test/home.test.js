"use strict";

var test = require("tape");
var server = require("../lib/server.js");

test("GET / should return 200", function (t) {

  var request = {
    method: "GET",
    url: "/"
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.end();
  });
});
