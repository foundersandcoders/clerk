"use strict";

var request = require("request");
var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";
var clean = require("d-bap");

function showMember (req, res) {

  var opts = {
    method: "GET",
    url: membersUrl + "/members/" + req.params.id,
    headers: {
      authorization: req.auth.credentials.token
    },
    json: true
  };

  request(opts, function (e, h, r) {

    var member;
    if (e || (h.statusCode === 404) || !r) {
      return res({ statusCode: 404, status: "Not found", message: "Member could not be found" }).code(404);
    } else {
      member = r._source;
      member.id = r._id;
      return res.view("showmember", { member: clean.object(member) });
    }
  });
}

module.exports = showMember;
