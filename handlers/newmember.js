"use strict";

var request = require("request");
var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";
var clean = require("d-bap");

function newMember (req, res) {

  var member = clean.object(req.payload);
  member.status = "active";

  var opts = {
    method: "POST",
    url: membersUrl + "/members",
    headers: {
      authorization: req.auth.credentials.token
    },
    body: member,
    json: true
  };

  request(opts, function (e, h, r) {

    if (e || !r || !r.created) {
      return res({ statusCode: 400, status: "Bad request", message: "Member could not be created" }).code(400);
    } else {
      return res.redirect("/members/" + r._id);
    }
  });

}

module.exports = newMember;
