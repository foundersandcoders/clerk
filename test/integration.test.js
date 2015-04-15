"use strict";

var test = require("tape");
var server = require("../lib/server.js");

test("GET / should return 200", function (t) {

  var request = {
    method: "GET",
    url: "/"
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.end();
  });

});


test("GET /login should return 200 and login form", function (t) {

  var request = {
    method: "GET",
    url: "/login"
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.ok(/form/.test(res.payload), "login page contains form");
    t.end();
  });
});


test("POST /login should return 200 and session if details are correct", function (t) {

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

    t.equals(res.statusCode, 200, "200 returned");
    console.log(res);
    t.end();
  });
});

/*
test("GET /signup should return 200", function (t) {

  var request = {
    method: "GET",
    url: "/signup"
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.ok(/form/.test(res.payload), "signup page contains form");
    t.end();
  });

});


test("POST /signup should return 200", function (t) {

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

    t.equals(res.statusCode, 200, "200 returned");
    t.end();
  });
});*/
