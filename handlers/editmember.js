"use strict";

var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";
var request = require("request");

function editMember (req, res) {

  var opts = {
    method: "PUT",
    url: membersUrl + "/members/" + req.params.id,
    body: req.payload,
    json: true,
    headers: {
      authorization: req.auth.credentials.token
    }
  };

  request(opts, function (e, h, r) {

    if (e || h.statusCode === 404 || !r) {
      return res(r).code(404);
    } else {
      res.redirect("/members/" + req.params.id);
    }
  });
}

module.exports = editMember;
