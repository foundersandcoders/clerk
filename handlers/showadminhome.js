"use strict";

function showAdminHome (req, res) {

  if (req.auth.credentials.rights === "admin") {
    return res.view("adminhome");
  } else {
    return res.redirect("/");
  }
}

module.exports = showAdminHome;
