"use strict";

var request = require("request");

function signup (req, res) {

  var authUrl = process.env.AUTH_URL || "http://0.0.0.0:8000";


  if (req.payload.password !== req.payload.cpassword) {
    return res.redirect("/signup");
  }

  request.post({
    url: authUrl + "/register",
    body: req.payload,
    json: true
  }, function (e, h) {

    if (!h.headers.authorization || e) {
      return res({ statusCode: 400, status: "Bad request", message: "Incorrect credentials" }).code(400);
    } else {
      req.auth.session.set({
        token: h.headers.authorization
      });
      return res.redirect("/");
    }
  });
}

module.exports = signup;
