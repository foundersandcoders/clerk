"use strict";

var request = require("request");
var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";

function newPayment (req, res) {

  var opts = {
    method: "PUT",
    url: membersUrl + "/payments/" + req.params.id,
    headers: {
      authorization: req.auth.credentials.token
    },
    body: req.payload,
    json: true
  };

  request(opts, function (e, h, r) {

    if (e || !r || r.created || h.statusCode !== 200) {
      return res({ statusCode: 400, status: "Not found", message: "Payment could not be updated" }).code(400);
    } else {
      return res.redirect("/members/" + req.payload.memberId);
    }
  });
}

module.exports = newPayment;