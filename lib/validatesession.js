"use strict";

var request = require("request");
var authUrl = process.env.AUTH_URL || "0.0.0.0:8000";

function validateSession (session, cb) {

  var token = session.token;

  var opts = {
    url: "http://" + authUrl + "/validate",
    headers: {
      authorization: token
    },
    json: true
  };

  request(opts, function (e, h, r) {

    if (!r.userId || r.ended) {
      return cb(null, false);
    } else {
      return cb(null, true, {userId: r.userId, rights: "admin", token: token });
    }
  });
}

module.exports = validateSession;
