"use strict";

var isMemberNumber = require("../lib/ismembernumber.js");

function search (req, res) {

  if (!req.payload.query) {
    return res({statusCode: 400, status: "Bad request", message: "Search query not provided"}).code(400);
  }
  var query = "?q=*" + req.payload.query + "* AND status:" + req.payload.status;

  if (isMemberNumber(req.payload.query)) {
    return res.redirect("/members/" + req.payload.query);
  } else {
    return res.redirect("/members/search" + query);
  }

}

module.exports = search;
