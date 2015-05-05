"use strict";

var members = require("../handlers/members.js")(require("../models/members.js"));
var payments = require("../handlers/payments.js")(require("../models/payments.js"));
var restricted = require("../handlers/private.js")();
var unrestricted = require("../handlers/public.js")();
var auth = require("../handlers/auth.js")(require("givit"));

module.exports = [

  // auth
<<<<<<< HEAD
  { method: "POST", path: "/login",  config: { handler: require("../handlers/login.js") }},
  { method: "POST", path: "/signup", config: { handler: require("../handlers/signup.js") }},
  { method: "GET",  path: "/logout", config: { handler: require("../handlers/logout.js"), auth: "session" }},

  // members
  { method: "POST", path: "/members",                 config: { handler: require("../handlers/newmember.js"),        auth: "session" }},
  { method: "POST", path: "/members/search",          config: { handler: require("../handlers/search.js"),           auth: "session" }},
  { method: "POST", path: "/members/{id}/edit",       config: { handler: require("../handlers/editmember.js"),       auth: "session" }},
  { method: "POST", path: "/members/{id}/delete",     config: { handler: require("../handlers/deletemember.js"),     auth: "session" }},
  { method: "POST", path: "/members/{id}/reactivate", config: { handler: require("../handlers/reactivatemember.js"), auth: "session" }},

  // payments
  { method: "POST", path: "/payments",                                config: { handler:  require("../handlers/newpayment.js"),     auth: "session" }},
  { method: "POST", path: "/payments/{id}/edit",                      config: { handler:  require("../handlers/updatepayment.js"),  auth: "session" }},
  { method: "POST", path: "/members/{memberId}/payments/{id}/delete", config: { handler: require("../handlers/deletepayment.js"),   auth: "session" }},

  // rendering routes
  { method: "GET", path: "/",                              config: { handler: require("../handlers/showhome.js") }},
  { method: "GET", path: "/admin",                         config: { handler: require("../handlers/showadminhome.js"),     auth: "session" }},
  { method: "GET", path: "/members/{id}/edit",             config: { handler: require("../handlers/showeditmember.js"),    auth: "session" }},
  { method: "GET", path: "/addmember",                     config: { handler: require("../handlers/shownewmember.js"),     auth: "session" }},
  { method: "GET", path: "/members/{id}",                  config: { handler: require("../handlers/showmember.js"),        auth: "session" }},
  { method: "GET", path: "/members/search",                config: { handler: require("../handlers/showsearchresults.js"), auth: "session" }},
  { method: "GET", path: "/members/{id}/payments",         config: { handler: require("../handlers/shownewpayment.js"),    auth: "session" }},
  { method: "GET", path: "/members/{id}/payments/{idPay}", config: { handler: require("../handlers/showeditpayment.js"),   auth: "session" }},
  {
    method: "GET",
    path: "/login",
    config: {
      handler: require("../handlers/showlogin.js"),
      auth: {
        strategy: "session",
        mode: "try"
      }
=======
  { method: "POST", path: "/login", config: { handler: auth.login }},
  { method: "POST", path: "/signup", config: { handler: auth.signup }},
  { method: "GET", path: "/logout", config: { handler: auth.logout, auth: "session" }},

  // members
  { method: "POST", path: "/members", config:
   {
      handler: members.create,
      auth: "session"
    }
  },
  { method: "GET",  path: "/members", config:
   {
     handler: members.find,
     auth: "session"
   }
  },
  { method: "GET",  path: "/members/{id}", config:
   {
     handler: members.findOne,
     auth: "session"
   }
  },
  { method: "PUT", path: "/members/{id}", config:
   {
     handler: members.update,
     auth: "session"
   }
  },
  { method: "DELETE", path: "/members/{id}", config:
   {
     handler: members.del,
     auth: "session"
   }
  },
  { method: "POST", path: "/members/{id}/reactivate", config:
   {
     handler: members.reactivate,
     auth: "session"
   }
  },


  // payments
  { method: "POST", path: "/payments", config:
   {
      handler: payments.create,
      auth: "session"
>>>>>>> refactor
    }
  },
  { method: "GET",  path: "/payments", config:
   {
     handler: payments.find,
     auth: "session"
   }
  },
  { method: "GET",  path: "/payments/{id}", config:
   {
     handler: payments.findOne,
     auth: "session"
   }
  },
  { method: "PUT", path: "/payments/{id}", config:
   {
     handler: payments.update,
     auth: "session"
   }
  },
  { method: "DELETE", path: "/payments/{id}", config:
   {
     handler: payments.del,
     auth: "session"
   }
  },

  { method: "GET", path: "/admin", handler: restricted.admin },
  { method: "GET", path: "/login", handler: unrestricted.login },
  { method: "GET", path: "/signup", handler: unrestricted.signup },

  // static route
  { method: "GET", path: "/{filepath*}", handler: {
    directory: {
      path: "assets",
      listing: true,
      index: true
    }
  }}
];
