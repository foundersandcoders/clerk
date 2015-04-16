"use strict";

function showSignup (req, res) {

  if (req.auth.isAuthenticated) {
    return res.redirect("/");
  }
  return res.view("signup");
}

module.exports = showSignup;
