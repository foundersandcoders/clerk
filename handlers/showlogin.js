"use strict";

function showLogin (req, res) {

  if (req.auth.isAuthenticated) {
    return res.redirect("/");
  }
  return res.view("login");
}

module.exports = showLogin;