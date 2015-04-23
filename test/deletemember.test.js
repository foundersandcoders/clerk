"use strict";

var test = require("tape");
var server = require("../lib/server.js");
var drop = require("./z_drop");
var members = require("rubberbands")("clerk", "members");

var cookie;

test("Teardown", function(t) {
  drop(function(res){
    t.equal(res.acknowledged, true, "ALL Records DELETED!");
    t.end();
  }).end();
});


test("POST /members/{id}/delete should respond with 302 if not logged in", function (t) {

  var opts = {
		method: "POST",
    url: "/members/wil/delete"
	};

  server.inject(opts, function (res) {
    t.equals(res.statusCode, 302, "302 received");
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
    cookie = res.headers["set-cookie"][0].split(";")[0];
    t.end();
  });
});


test("create member", function (t) {

  members.create({
    id: 1234,
    name: "wil",
    message: "test"
  }, function (res) {

    t.ok(res.created, "member created");
    t.end();
  });
});

test("POST /members/{id}/delete should return 404 if member not found", function (t) {

  var opts = {
		method: "POST",
    url: "/members/wil/delete",
    headers: {
      cookie: cookie
    }
	};

  server.inject(opts, function (res) {
    t.equals(res.statusCode, 404, "404 received");
		t.end();
	});
});

test("POST /members/{id}/delete should return 302 if member found", function (t) {

  var opts = {
    method: "POST",
    url: "/members/1234/delete",
    headers: {
      cookie: cookie
    },
    payload: {
      deletionReason: "deceased"
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
    t.equals(res.raw.res._headers.location, "/admin", "redirect url matches expected");
    t.end();
  });
});

test("member should hae deleted set to true if member found", function (t) {

  members.read(1234, function (res) {

    t.ok(res.found, "member found");
    t.equals(res._source.deleted, true, "deleted set to true");
    t.equals(res._source.deletionReason, "deceased", "deletionReason set");
    t.equals(res._source.deletionDate, new Date().toISOString().split("T")[0], "deletionDate set");
    t.equals(res._source.message, "test", "original properties unchanged");
    t.equals(res._source.name, "wil", "original properties unchanged");
    t.end();
  });
});

test("Teardown", function(t) {
  drop(function(res){
    t.equal(res.acknowledged, true, "ALL Records DELETED!");
    t.end();
  }).end();
});
