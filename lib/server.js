"use strict";

var hapi = require("hapi");
var port = process.env.PORT || 8080;

var internals = {};

internals.server = new hapi.Server();

internals.server.connection({
  port: port
});

internals.server.views({
  engines: {
    "html": require("handlebars")
  },
  relativeTo: __dirname,
  path: "../views/",
  layout: true
});

internals.server.register([ {register: require("hapi-auth-cookie")} ], function (err) {

  internals.server.auth.strategy("session", "cookie", {
    password: "test",
    cookie: "sid",
    redirectTo: "/login",
    redirectOnTry: false,
    validateFunc: require("./validatesession.js"),
    isSecure: false
  });

  internals.server.route(require("./routes.js"));

});

module.exports = internals.server;
