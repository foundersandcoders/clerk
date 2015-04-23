"use strict";

var request = require("request");
var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";
var clean = require("d-bap");

function newPayment (req, res) {

  var opts = {
    method: "POST",
    url: membersUrl + "/payments",
    headers: {
      authorization: req.auth.credentials.token
    },
    body: clean.object(req.payload),
    json: true
  };


  request(opts, function (e, h, r) {

    console.log(r);

    if (e || !r || !r.created) {
      return res({ statusCode: 400, status: "Not found", message: "Payment could not be created" }).code(400);
    } else {
      return res.redirect("/members/" + req.payload.memberId);
    }
  });

}

module.exports = newPayment;