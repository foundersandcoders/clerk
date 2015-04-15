"use strict";

var request = require("request");
var authUrl = process.env.AUTH_URL || "http://0.0.0.0:8000"

function validateSession (session, cb) {

  var token = session.token;

  var opts = {
    url: authUrl + "/validate",
    headers: {
      authorization: token
    }
  };

  request(opts, function (e, h, r) {

    r = JSON.parse(r);
    if (!r.userId || r.ended) {
      console.log("invalid");
      return cb(null, false);
    } else {
      console.log("valid");
      return cb(null, true, {userId: r.userId, rights: "admin", token: token });
    }
  });
}

module.exports = validateSession;
