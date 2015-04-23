"use strict";

var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";
var request = require("request");
var clean = require("d-bap");

function editMember (req, res) {

  var member = clean.object(req.payload);
  var opts = {
    method: "PUT",
    url: membersUrl + "/members/" + req.params.id,
    body: member,
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
