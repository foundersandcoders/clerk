"use strict";

var test = require("tape");
var server = require("../lib/server.js");
var drop = require("./z_drop");

var biscuit;

test("Teardown", function(t) {
  drop(function(res){
    t.equal(res.acknowledged, true, "ALL Records DELETED!");
    t.end();
  }).end();
});

test("POST /signup should create account and return cookie with 302", function (t) {

  var payload = {
    email: "wil",
    password: "hello"
  };
  var request = {
    method: "POST",
    url: "/signup",
    payload: payload
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.ok(res.headers["set-cookie"], "cookie returned");
    t.end();
  });
});

test("GET /admin should respond with 302 if not logged in", function (t) {

  var request = {
    method: "GET",
    url: "/admin"
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 302, "302 received");
    t.end();
  });
});


test("POST /login should return cookie", function (t) {

  var payload = {
    email: "wil",
    password: "hello"
  };
  var request = {
    method: "POST",
    url: "/login",
    payload: payload
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.ok(res.headers["set-cookie"], "cookie returned");
    biscuit = res.headers["set-cookie"][0].split(";")[0];
    t.end();
  });

});

test("GET /admin should respond with 200 if logged in as admin", function (t) {

  var request = {
    method: "GET",
    url: "/admin",
    headers: {
      cookie: biscuit
    }
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 200, "200 received");
    t.end();
  });
});

test("GET /logout should respond with 302 if logged in", function (t) {

  var request = {
    method: "GET",
    url: "/logout",
    headers: {
      cookie: biscuit
    }
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.end();
  });
});

test("GET /admin should response with 302 if session has ended", function (t) {

  var request = {
    method: "GET",
    url: "/admin",
    headers: {
      cookie: biscuit
    }
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 302, "302 received");
    t.end();
  });
});

test("GET /admin should response with 302 if not logged in as admin", function (t) {

  var request = {
    method: "GET",
    url: "/admin",
    credentials: {
      rights: "user"
    }
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 302, "302 received");
    t.end();
  });
});
