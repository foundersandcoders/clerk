"use strict";

module.exports = [

  { method: "GET", path: "/", config: { handler: require("../handlers/showhome.js") }},
  { method: "GET", path: "/admin", config: { handler: require("../handlers/showadminhome.js"), auth: "session" }},
  { method: "GET", path: "/addmember", config: { handler: require("../handlers/shownewmember.js"), auth: "session" }},
  {
    method: "GET",
    path: "/login",
    config: {
      handler: require("../handlers/showlogin.js"),
      auth: {
        strategy: "session",
        mode: "try"
      }
    }
  },

  { method: "POST", path: "/login", config: { handler: require("../handlers/login.js") }},
  { method: "GET", path: "/signup", config: { handler: require("../handlers/showsignup.js") }},
  { method: "POST", path: "/signup", config: { handler: require("../handlers/signup.js") }},
  { method: "GET", path: "/logout", config: { handler: require("../handlers/logout.js"), auth: "session" }},
  { method: "GET", path: "/{filepath*}", handler: {
    directory: {
      path: "assets",
      listing: true,
      index: true
    }
  }}
];
