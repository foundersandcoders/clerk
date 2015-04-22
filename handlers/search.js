"use strict";

var request = require("request");
var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";

function search (req, res) {

  if (!req.payload.query) {
    return res({statusCode: 400, status: "Bad request", message: "Search query not provided"}).code(400);
  }
  var query = "?firstname=*" + req.payload.query + "*";

  var opts = {
    method: "GET",
    url: membersUrl + "/members" + query,
    headers: {
      authorization: req.auth.credentials.token
    },
    json: true
  };

  request(opts, function (e, h, r) {

    if (e || h.statusCode === 404 || !r) {
      return res(r).code(404);
    } else {
      return res.view("searchresults", { results: r});
    }
  });
}

module.exports = search;
