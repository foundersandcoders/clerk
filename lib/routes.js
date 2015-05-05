"use strict";

var members      = require("../handlers/members.js")(require("../models/members.js"));
var payments     = require("../handlers/payments.js")(require("../models/payments.js"));
var restricted   = require("../handlers/private.js")(require("../models/members.js"));
var unrestricted = require("../handlers/public.js")();
var auth         = require("../handlers/auth.js")(require("givit"));

module.exports = [

  // auth
  { method: "POST", path: "/login", config: { handler: auth.login }},
  { method: "POST", path: "/signup", config: { handler: auth.signup }},
  { method: "GET", path: "/logout", config: { handler: auth.logout, auth: "session" }},

  // members
  { method: "POST", path: "/api/members", config:
   {
      handler: members.create,
      auth: "session"
    }
  },
  { method: "GET",  path: "/api/members", config:
   {
     handler: members.find,
     auth: "session"
   }
  },
  { method: "GET",  path: "/api/members/{id}", config:
   {
     handler: members.findOne,
     auth: "session"
   }
  },
  { method: "PUT", path: "/api/members/{id}", config:
   {
     handler: members.update,
     auth: "session"
   }
  },
  { method: "DELETE", path: "/api/members/{id}", config:
   {
     handler: members.del,
     auth: "session"
   }
  },
  { method: "POST", path: "/api/members/{id}/reactivate", config:
   {
     handler: members.reactivate,
     auth: "session"
   }
  },


  // payments
  { method: "POST", path: "/api/payments", config:
   {
      handler: payments.create,
      auth: "session"
    }
  },
  { method: "GET",  path: "/api/payments", config:
   {
     handler: payments.find,
     auth: "session"
   }
  },
  { method: "GET",  path: "/api/payments/{id}", config:
   {
     handler: payments.findOne,
     auth: "session"
   }
  },
  { method: "PUT", path: "/api/payments/{id}", config:
   {
     handler: payments.update,
     auth: "session"
   }
  },
  { method: "DELETE", path: "/api/payments/{id}", config:
   {
     handler: payments.del,
     auth: "session"
   }
  },

  { method: "GET", path: "/admin",        handler: restricted.admin },
  { method: "GET", path: "/login",        handler: unrestricted.login },
  { method: "GET", path: "/signup",       handler: unrestricted.signup },
  { method: "GET", path: "/addmember",    handler: restricted.addmember },
  { method: "GET", path: "/members/{id}", handler: restricted.member, config: {auth: "session"}},

  // static route
  { method: "GET", path: "/{filepath*}", handler: {
    directory: {
      path: "assets",
      listing: true,
      index: true
    }
  }}
];
