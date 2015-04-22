"use strict";

var request = require("request");
var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";

function newMember (req, res) {

  var opts = {
    method: "POST",
    url: membersUrl + "/members",
    headers: {
      authorization: req.auth.credentials.token
    },
    body: req.payload,
    json: true
  };

  request(opts, function (e, h, r) {

    if (e || !r || !r.created) {
      return res({ statusCode: 400, status: "Not found", message: "Member could not be created" }).code(400);
    } else {
      return res.redirect("/members/" + r._id);
    }
  });

}

module.exports = newMember;
