"use strict";

var helper = require("./helpers");

function showNewMember (req, res) {

//  if (req.auth.credentials.rights === "admin") {
    return res.view("newpayment", {memberId: req.params.id, types: helper.validateTypes});
/*  } else {
    return res.redirect("/");
  }*/
}

module.exports = showNewMember;
