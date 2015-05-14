"use strict";


module.exports = {
  createRoutes: createRoutes,
  createRoute: createRoute
};


function createRoute (method, path, handler, auth) {
  return {
    method: method,
    path: path,
    config: {
      handler: handler,
      auth: auth
    }
  };
}


function createRoutes (collection) {

  var file = collection + ".js";
  var model = require("../models/" + file);
  var handlers = require("../handlers/" + file)(model);

  var routes = [];
  routes.push(createRoute("POST",   "/api/" + collection,          handlers.create,  "session"));
  routes.push(createRoute("GET",    "/api/" + collection,          handlers.find,    "session"));
  routes.push(createRoute("GET",    "/api/" + collection + "{id}", handlers.findOne, "session"));
  routes.push(createRoute("PUT",    "/api/" + collection + "{id}", handlers.update,  "session"));
  routes.push(createRoute("DELETE", "/api/" + collection + "{id}", handlers.del,     "session"));

  return routes;

};
