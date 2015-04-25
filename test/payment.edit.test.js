"use strict";

var test = require("tape");
var server = require("../lib/server.js");
var drop = require("./z_drop.js");
var members = require("rubberbands")("clerk", "members");
var payments = require("rubberbands")("clerk", "payments");

var cookie;

test("Delete records", function(t) {
  drop(function (res){

    t.equal(res.acknowledged, true, "ALL Records DELETED!");
    t.end();
  }).end();
});

test("GET /members/{id} should return 302 if not logged in", function (t) {

  var opts = {
    method: "GET",
    url: "/members/wil",
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 returned");
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
    name: "wil"
  }, function (res) {

    t.ok(res.created, "member created");
    t.end();
  });
});

test("GET /members/1234 should return 200 if correct member id and valid session", function (t) {

  var opts = {
    method: "GET",
    url: "/members/1234",
    headers: {
      cookie: cookie
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.end();
  });
});


test("GET /members/{id}/payments/{id} should return 404 if correct member id but non existing payment", function (t) {

  var opts = {
    method: "GET",
    url: "/members/1234/payments/87593087",
    headers: {
      cookie: cookie
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 404, "404 returned");
    t.end();
  });
});

test("create payment", function (t) {

  payments.create({
    memberId: 1234,
    id: 4444,
    typeCode: "HO",
    datePaid: new Date().toISOString(),
    subscription: 1234,
    donation: 1234,
    events: 1234,
    listReference: "oeua"
  }, function (res) {
    
     t.ok(res.created, "payment created");
     t.end();
  });
});


test("GET /members/{id}/payments/{id} should return 404 if correct member id but non existing payment", function (t) {

  var opts = {
    method: "GET",
    url: "/members/1234/payments/4444",
    headers: {
      cookie: cookie
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.end();
  });
});
