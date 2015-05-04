"use strict";


var authUrl = process.env.AUTH_URL || "0.0.0.0:8000";


module.exports = function (request) {

  return {
    login: function login (req, res) {

      var url = "http://" + req.payload.email + ":" + req.payload.password;
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
          return res(r.body).code(r.statusCode);
        }
      });
    },
    logout: function logout (req, res) {

      var opts = {
        method: "GET",
        uri: "http://" + authUrl + "/logout",
        headers: {
          authorization: req.auth.credentials.token
        }
      };

      request(opts, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          req.auth.session.clear();
          return res(r);
        }
      });
    },
    signup: function signup (req, res) {

      if (req.payload.password !== req.payload.cpassword) {
        return res("passwords don't match").code(401);
      }

      var opts = {
        method: "POST",
        uri: "http://" + authUrl + "/signup",
        body: req.payload
      }

      request(opts, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          req.auth.session.set({
            token: r.headers.authorization
          });
          return res(r.body).code(r.statusCode);
        }
      });
    }
  };
}
