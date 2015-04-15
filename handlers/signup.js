"use strict";

var request = require("request");

function signup (req, res) {

  var url = "http://0.0.0.0:8000/register";
  var payload = JSON.stringify(req.payload);

  console.log(url, payload);
  request.post({
    url: url,
    body: payload
  }, function (e, h, r) {
    //console.log(h);
    res(r);
  });
}

module.exports = signup;
