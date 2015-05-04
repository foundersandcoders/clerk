"use strict";


var test = require("tape");
var server = require("../lib/server");
var request = require("givit");


var user = {
  email: "wil",
  password: "hello",
  cpassword: "hello"
};

var cookie;

test("NOT A TEST: clear db", function (t) {

  var opts = {
    method: "DELETE",
    uri: "http://127.0.0.1:9200/_all"
  };

  request(opts, function () {

    console.log("delete request to db finished");
    t.end();
  });
});

test("POST /signup should return 401 if passwords don't match", function (t) {

  var opts = {
    method: "POST",
    url: "/signup",
    payload: {
      email: "wil",
      password: "hollo",
      cpassword: "hello"
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 401, "401 returned");
    t.end();
  });
});


test("POST /signup should return 200 if passwords match", function (t) {

  var opts = {
    method: "POST",
    url: "/signup",
    payload: user
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.ok(res.headers["set-cookie"], "cookie returned");
    cookie = res.headers["set-cookie"][0].split(";")[0];
    t.end();
  });
});


test("POST /login should return 401 if not successful", function (t) {

  var opts = {
    method: "POST",
    url: "/login",
    payload: {
      email: "bob",
      password: "invalid"
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 401, "401 returned");
    t.end();
  });
});


test("POST /login should return 200 if successful", function (t) {

  var opts = {
    method: "POST",
    url: "/login",
    payload: user
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.end();
  });
});

test("GET /logout should return 200 if successful", function (t) {

  var opts = {
    method: "GET",
    url: "/logout",
    headers: {
      cookie: cookie
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.end();
  });
});

test("GET /logout should return 302 if not logged in", function (t) {

  var opts = {
    method: "GET",
    url: "/logout"
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.end();
  });
});


test("NOT A TEST: clear db", function (t) {

  var opts = {
    method: "DELETE",
    uri: "http://127.0.0.1:9200/_all"
  };

  request(opts, function () {

    console.log("delete request to db finished");
    t.end();
  });
});
