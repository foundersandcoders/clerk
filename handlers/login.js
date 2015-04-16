"use strict";

var authUrl = process.env.AUTH_URL || "0.0.0.0:8000";
var request = require("request");

function login (req, res) {

  var url = "http://" + req.payload.email + ":" + req.payload.password;
  url += "@" + authUrl + "/login";
  request(url, function (e, h) {

    if (!h || !h.headers.authorization || e) {
      return res({ statusCode: 401, status: "Unauthorized", message: "Invalid credentials" }).code(401);
    } else {
      req.auth.session.set({
        token: h.headers.authorization
      });
      return res.redirect("/");
    }
  });
}

module.exports = login;
