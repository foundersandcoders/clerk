"use strict";

var authUrl = process.env.AUTH_URL || "http://0.0.0.0:8000"
var request = require("request");

function login (req, res) {

  var url = "http://" + req.payload.email + ":" + req.payload.password;
  url += "@0.0.0.0:8000/login";
  request(url, function (e, h, r) {

    req.auth.session.set({
      token: h.headers.authorization
    });
    return res.redirect("/");
  });
}

module.exports = login;
