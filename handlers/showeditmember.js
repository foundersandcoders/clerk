"use strict";

var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";
var request = require("request");

function showEditMember (req, res) {


  var opts = {
    method: "GET",
    url: membersUrl + "/members/" + req.params.id,
    json: true,
    headers: {
      authorization: req.auth.credentials.token
    }
  };

  request(opts, function (e, h, r) {

    var member;
    if (e || h.statusCode === 404 || !r) {
      return res(r).code(404);
    } else {
      member = r._source;
      member.id = r._id;
      return res.view("editmember", {member: member});
    }
  });
}

module.exports = showEditMember;
