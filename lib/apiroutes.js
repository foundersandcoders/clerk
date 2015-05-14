"use strict";

var helpers      = require("./helpers.js");
var members      = require("../handlers/members.js")(require("../models/members.js"));
var restricted   = require("../handlers/private.js")(require("../models/members.js"));

var extraRoutes = [{
  method: "POST", path: "/api/upload",
  config: {
    handler: restricted.upload,
    payload: { maxBytes: 4000000, parse: false }
  }
}, {
  method: "POST", path: "/api/members/{id}/reactivate",
  config: {
    handler: members.reactivate,
    auth: "session"
  }
}];


module.exports = extraRoutes.concat(helpers.createRoutes("payments"),
                                    helpers.createRoutes("members"),
                                    helpers.createRoutes("charges"));
