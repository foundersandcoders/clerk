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

test("GET /login should return 200 and login form if not logged in", function (t) {

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

test("POST /signup should create account and return cookie with 302", function (t) {

  var payload = {
    email: "wil",
    password: "hello",
    cpassword: "hello"
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

test("POST /login should return 302 and session if details are correct", function (t) {

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


test("GET /login should return 302 if logged in already", function (t) {

  var request = {
    method: "GET",
    url: "/login",
    headers: {
      cookie: biscuit
    }
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.end();
  });
});

test("POST /login should return 401 if details are incorrect", function (t) {

  var payload = {
    email: "hereclitus",
    password: "euclidean"
  };
  var request = {
    method: "POST",
    url: "/login",
    payload: payload
  };

  server.inject(request, function (res) {

    t.equals(res.statusCode, 401, "401 returned");
    t.end();
  });
});
