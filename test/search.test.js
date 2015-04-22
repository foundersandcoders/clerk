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


test("POST /search should return 302 if no authentication", function (t) {

  var opts = {
    method: "POST",
    url: "/search"
  };
  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.end();
  });
});

test("POST /search should return 404 if authentication but no results", function (t) {

  var payload = {
    query: "eeee"
  };
  var opts = {
    method: "POST",
    url: "/search",
    headers: {
      cookie: biscuit
    },
    payload: payload
  };
  server.inject(opts, function (res) {

    t.equals(res.statusCode, 404, "404 returned");
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

test("POST /search should return 200 if authentication and results returned", function (t) {

  var payload = {
    query: "william"
  };
  var opts = {
    method: "POST",
    url: "/search",
    headers: {
      cookie: biscuit
    },
    payload: payload
  };

  setTimeout(function(){

    server.inject(opts, function (res) {

      t.equals(res.statusCode, 200, "200 returned");
      t.end();
    });
  }, 1000);
});

test("POST /search should return 400 if no query payload provided", function (t) {


  var payload = {};
  var opts = {
    method: "POST",
    url: "/search",
    headers: {
      cookie: biscuit
    },
    payload: payload
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 400, "400 returned");
    t.end();
  });
});

test("Teardown", function(t) {
  drop(function(res){
    t.equal(res.acknowledged, true, "ALL Records DELETED!");
    t.end();
  }).end();
});
