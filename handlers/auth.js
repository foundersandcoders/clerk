"use strict";


var authUrl = process.env.AUTH_URL || "0.0.0.0:8000";
var protocol = (process.env.NODE_ENV === "staging") ? "https://" : "http://";


module.exports = function (request) {

  return {
    login: function (req, res) {

      var url = protocol + req.payload.email + ":" + req.payload.password;
      url += "@" + authUrl + "/login";

      var opts = {
        method: "GET",
        uri: url
      };

      request(opts, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          req.auth.session.set({
            token: r.headers.authorization
          });
          return res.redirect("/admin");
        }
      });
    },
    logout: function (req, res) {

      var opts = {
        method: "GET",
        uri: protocol + authUrl + "/logout",
        headers: {
          authorization: req.auth.credentials.token
        }
      };

      request(opts, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          req.auth.session.clear();
          return res.redirect("/login");
        }
      });
    },
    signup: function (req, res) {

      if (req.payload.password !== req.payload.cpassword) {
        return res("passwords don't match").code(401);
      }
      var opts = {
        method: "POST",
        uri: protocol + authUrl + "/signup",
        body: req.payload
      }

      request(opts, function (e, r) {
        console.log(e);
        
        if (e) {
          return res(e).code(500);
        } else {
          req.auth.session.set({
            token: r.headers.authorization
          });
          return res.redirect("/admin");
        }
      });
    }
  };
}
