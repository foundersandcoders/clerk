"use strict";


var test     = require("tape");
var server   = require("../lib/server.js");
var drop     = require("./z_drop");
var members  = require("rubberbands")("clerk", "members");
var payments = require("rubberbands")("clerk", "payments");


var biscuit;
var paymentId;


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


test("POST /payments should return 302 payment successfully created", function (t) {

  var opts = {
    method: "POST",
    url: "/payments",
    headers: {
      cookie: biscuit
    },
    payload: {
      memberId: 1234,
      datePaid: new Date(),
      donation: 10,
      typeCode: "BACSR"
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 received");
    t.equals(res.raw.res._headers.location, "/members/1234", "redirect url matches expected");
    t.end();
  });
});


test("payment should exist in database", function (t) {

  // wait because ES not searchable within ~1000ms
  setTimeout(function () {

    payments.search("memberId", 1234, function (res) {
      // console.log(res.hits);
      t.equals(res.hits.hits.length, 1, "payment exists in database");
      paymentId = res.hits.hits[0]._id;
      t.end();
    });
  }, 1500);
});


test("POST members/1234/payments/{id}/delete should delete the payment", function (t){

  var opts = {
    method: "POST",
    url: "/members/" + 1234 + "/payments/" + paymentId + "/delete",
    headers: {
      cookie: biscuit
    }
  };  

  server.inject(opts, function (res){
    // console.log(JSON.parse(res));
    t.equals(res.statusCode, 302, "302 returned");
    t.end();
  });
});


test("payment should NOT exist in database", function (t) {

  // wait because ES not searchable within ~1000ms
  setTimeout(function () {

    payments.read(paymentId, function (res) {
      // console.log(res);
      t.equals(res.found, false, "payment does NOT exists in database");
      t.end();
    });
  }, 1500);
});