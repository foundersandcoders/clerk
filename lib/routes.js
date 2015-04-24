"use strict";

module.exports = [

  // auth
  { method: "POST", path: "/login", config: { handler: require("../handlers/login.js") }},
  { method: "POST", path: "/signup", config: { handler: require("../handlers/signup.js") }},
  { method: "GET", path: "/logout", config: { handler: require("../handlers/logout.js"), auth: "session" }},

  // members
  { method: "POST", path: "/members", config: { handler: require("../handlers/newmember.js"), auth: "session" }},
  { method: "POST", path: "/members/search", config: { handler: require("../handlers/search.js"), auth: "session" }},
  { method: "POST", path: "/members/{id}/edit", config: { handler: require("../handlers/editmember.js"), auth: "session" }},
  { method: "POST", path: "/members/{id}/delete", config: { handler: require("../handlers/deletemember.js"), auth: "session" }},
  { method: "POST", path: "/members/{id}/reactivate", config: { handler: require("../handlers/reactivatemember.js"), auth: "session" }},

  // payments
  { method: "POST", path: "/payments", config: {handler: require("../handlers/newpayment.js"), auth: "session" }},
  { method: "POST",  path: "/payments/{id}", config: {handler: require("../handlers/updatepayment.js"), auth: "session" }},
  { method: "POST", path: "/payments/{id}/delete", config: { handler: require("../handlers/deletepayment.js"), auth: "session" }},

  // rendering routes
  { method: "GET", path: "/", config: { handler: require("../handlers/showhome.js") }},
  { method: "GET", path: "/admin", config: { handler: require("../handlers/showadminhome.js"), auth: "session" }},
  { method: "GET", path: "/members/{id}/edit", config: { handler: require("../handlers/showeditmember.js"), auth: "session" }},
  { method: "GET", path: "/addmember", config: { handler: require("../handlers/shownewmember.js"), auth: "session" }},
  { method: "GET", path: "/members/{id}", config: { handler: require("../handlers/showmember.js"), auth: "session" }},
  { method: "GET", path: "/members/search", config: { handler: require("../handlers/showsearchresults.js"), auth: "session" }},
  { method: "GET", path: "/members/{id}/payments", config: { handler: require("../handlers/shownewpayment.js"), auth: "session" }},
  { method: "GET", path: "/members/{id}/payments/{idPay}", config: { handler: require("../handlers/showeditpayment.js"), auth: "session" }},
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
  {
    method: "GET",
    path: "/signup",
    config: {
      handler: require("../handlers/showsignup.js"),
      auth: {
        strategy: "session",
        mode: "try"
      }
    }
  },

  // static route
  { method: "GET", path: "/{filepath*}", handler: {
    directory: {
      path: "assets",
      listing: true,
      index: true
    }
  }}
];
