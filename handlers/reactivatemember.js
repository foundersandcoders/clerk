"use strict";

var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";
var request = require("request");

function reactivateMember (req, res) {


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
      member.deleted = false;
      delete member.deletionReason;
      delete member.deletionDate;

      opts = {
        method: "PUT",
        url: membersUrl + "/members/" + req.params.id,
        json: true,
        headers: {
          authorization: req.auth.credentials.token
        },
        body: member
      };

      request(opts, function (e, h, r) {

        if (e || h.statusCode === 404 || !r) {
          return res({statusCode:500,status:"Server error", message: "Member not deleted"}).code(500);
        } else {
          return res.redirect("/members/" + req.params.id);
        }
      });

    }
  });
}

module.exports = reactivateMember;
