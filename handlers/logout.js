"use strict";

var request = require("request");
var authUrl = process.env.AUTH_URL || "http://0.0.0.0:8000"

function logout (req, res) {

  console.log(req.auth);
  var token = req.auth.credentials.token;
  var opts = {
    url: authUrl + "/logout",
    headers: {
      authorization: token
    }
  };

  request(opts, function (e, h, r) {

    req.auth.session.clear();
    res.redirect("/");
  });


}

module.exports = logout;