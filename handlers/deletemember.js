"use strict";

var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";
var request = require("request");

function deleteMember (req, res) {

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
    if (e || h.statusCode === 404 || !r || !r.found) {
      return res(r).code(404);
    } else {
      member = r._source;
      member.id = r._id;
      member.status = "deleted";
      member.deletionReason = req.payload.deletionReason;
      member.deletionDate = new Date().toISOString().split("T")[0];

      opts = {
        method: "PUT",
        url: membersUrl + "/members/" + req.params.id,
        body: member,
        json: true,
        headers: {
          authorization: req.auth.credentials.token
        }
      };

      request(opts, function (e, h, r) {

        console.log(r);
        if (e || h.statusCode === 404 || !r) {
          return res({statusCode:500,status:"Server error", message: "Member not deleted"}).code(500);
        } else {
          return res.redirect("/admin");
        }
      });
    }
  });
}

module.exports = deleteMember;