"use strict";

function showNewMember (req, res) {

//  if (req.auth.credentials.rights === "admin") {
    return res.view("newmember");
/*  } else {
    return res.redirect("/");
  }*/
}

module.exports = showNewMember;
