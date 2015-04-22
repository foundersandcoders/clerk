"use strict";

var test = require("tape");
var server = require("../lib/server.js");
var drop = require("./z_drop");
var members = require("rubberbands")("clerk", "members");

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
    biscuit = res.headers["set-cookie"][0].split(";")[0];
    t.end();
  });
});


test("POST /members/search should return 302 if no authentication", function (t) {

  var opts = {
    method: "POST",
    url: "/members/search"
  };
  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.end();
  });
});

test("POST /members/search should return 302 if authentication", function (t) {

  var payload = {
    query: "eeee"
  };
  var opts = {
    method: "POST",
    url: "/members/search",
    headers: {
      cookie: biscuit
    },
    payload: payload
  };
  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.equals(res.raw.res._headers.location, "/members/search?q=*eeee*");
    t.end();
  });
});

test("create member", function (t) {

  members.create({
    id: 14141,
    firstname: "william"
  }, function (res) {

    t.ok(res.created, "member created");
    t.end();
  });
});

test("POST /members/search should return 400 if no query payload provided", function (t) {


  var payload = {};
  var opts = {
    method: "POST",
    url: "/members/search",
    payload: payload,
    headers: {
      cookie: biscuit
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 400, "400 returned");
    t.end();
  });
});

test("POST /members/search should return 302 if member number provided", function (t) {


  var payload = {
    query: "14141"
  };
  var opts = {
    method: "POST",
    url: "/members/search",
    payload: payload,
    headers: {
      cookie: biscuit
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.equals(res.raw.res._headers.location, "/members/14141", "redirect url matches expected");
    t.end();
  });
});

test("POST /members/search should return 302 if member number provided", function (t) {


  var payload = {
    query: "illi"
  };
  var opts = {
    method: "POST",
    url: "/members/search",
    payload: payload,
    headers: {
      cookie: biscuit
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.equals(res.raw.res._headers.location, "/members/search?q=*illi*");
    t.end();
  });
});

test("GET /members/search should return 200 if authentication and matching query", function (t) {

  var opts = {
    method: "GET",
    url: "/members/search?q=*william*",
    headers: {
      cookie: biscuit
    }
  };
  setTimeout(function () {

    server.inject(opts, function (res) {

      t.equals(res.statusCode, 200, "200 returned");
      t.end();
    });
  }, 1000);
});

test("GET /members/search should return 302 if no authentication", function (t) {

  var opts = {
    method: "GET",
    url: "/members/search?q=*william*"
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.end();
  });
});

test("GET /members/search should return 404 if authentication but no matches", function (t) {

  var opts = {
    method: "GET",
    url: "/members/search?q=*illiuaoeuauea*",
    headers: {
      cookie: biscuit
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 404, "404 returned");
    t.end();
  });
});


test("Teardown", function(t) {
  drop(function(res){
    t.equal(res.acknowledged, true, "ALL Records DELETED!");
    t.end();
  }).end();
});
