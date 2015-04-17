"use strict";

var request = require("request");

function signup (req, res) {

  var url = "http://0.0.0.0:8000/register";
  //var payload = JSON.stringify(req.payload);

  request.post({
    url: url,
    body: req.payload,
    json: true
  }, function (e, h) {
    console.log(e, h);
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
