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

test("GET /members/{id}/edit should respond with 302 if not logged in", function (t) {

  var opts = {
		method: "GET",
    url: "/members/wil/edit"
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
    message: "test",
    paysByStandingOrder: true,
    membershipType: "Annual Single"
  }, function (res) {

    t.ok(res.created, "member created");
    t.end();
  });
});

test("GET /members/{id}/edit when logged in should return 404 if member not found", function (t) {

  var opts = {
    method: "GET",
    url: "/members/wil/edit",
    headers: {
      cookie: cookie
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 404, "404 returned");
    t.end();
  });
});

test("GET /editmember when logged in should return 200 if member found", function (t) {

  var opts = {
    method: "GET",
    url: "/members/1234/edit",
    headers: {
      cookie: cookie
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.end();
  });
});

test("POST /members/{id}/edit should return 302 if not logged in", function (t) {

  var opts = {
		method: "POST",
		url: "/members/wil/edit",
    payload: {
      name: "HELOLOL"
    }
	};

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 received");
		t.end();
	});
});


test("POST /members/{id}/edit should return 302 if logged in and successful update", function (t) {

  var opts = {
		method: "POST",
		url: "/members/1234/edit",
    headers: {
      cookie: cookie
    },
    payload: {
      name: "HELOLOL"
    }
	};

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 received");
    t.equals(res.raw.res._headers.location, "/members/1234", "redirect url is as expected");
		t.end();
	});
});

test("member should be updated", function (t) {

  members.read(1234, function (res) {

    t.ok(res.found, "member found");
    t.equals(res._source.name, "HELOLOL", "member updated as expected");
    t.end();
  });
});

test("POST /members/{id}/edit should return 404 if logged in and member not found", function (t) {

  var opts = {
		method: "POST",
		url: "/members/121434/edit",
    headers: {
      cookie: cookie
    },
    payload: {
      name: "HELOLOL"
    }
	};

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 404, "404 received");
		t.end();
	});
});

test("Teardown", function(t) {
  drop(function(res){
    t.equal(res.acknowledged, true, "ALL Records DELETED!");
    t.end();
  }).end();
});
