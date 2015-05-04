"use strict";


var test = require("tape");
var server = require("../lib/server");
var request = require("givit");
var is = require("torf");

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


test("NOT A TEST: signup", function (t) {

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


test("POST /members should create member", function (t) {

  var member = {
    id: "1234",
    name: "wil",
    status: "coolest guy this side of saigon"
  };

  var opts = {
    method: "POST",
    url: "/members",
    payload: member,
    headers: {
      cookie: cookie
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.equals(JSON.parse(res.payload).id, "1234", "correct id");
    t.equals(JSON.parse(res.payload).name, "wil", "created member returned");
    t.end();
  });
});


test("GET /members/1234 should return member if found", function (t) {

  var opts = {
    method: "GET",
    url: "/members/1234",
    headers: {
      cookie: cookie
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 200, "200 returned");
    t.equals(JSON.parse(res.payload).id, "1234", "correct id");
    t.equals(JSON.parse(res.payload).name, "wil", "created member returned");
    t.end();
  });
});

test("GET /members/1234 should return 404 if not found", function (t) {

  var opts = {
    method: "GET",
    url: "/members/22334",
    headers: {
      cookie: cookie
    }
  };

  server.inject(opts, function (res) {

    res.payload = JSON.parse(res.payload);
    t.equals(res.statusCode, 404, "404 returned");
    t.ok(is.type(res.payload, "object"), "object returned");
    t.notOk(is.ok(res.payload), "object is empty");
    t.end();
  });
});

test("GET /members?query=value should return 200 and matches if found", function (t) {

  var opts = {
    method: "GET",
    url: "/members?name=wil&id=1234",
    headers: {
      cookie: cookie
    }
  };

  setTimeout(function () {

    server.inject(opts, function (res) {

      res.payload = JSON.parse(res.payload);
      t.equals(res.statusCode, 200, "200 returned");
      t.equals(res.payload[0].id, "1234", "correct id");
      t.equals(res.payload[0].name, "wil", "created member returned");
      t.end();
    });
  }, 1000);
});


test("GET /members?query=value should return 200 if not found", function (t) {

  var opts = {
    method: "GET",
    url: "/members?name=bob",
    headers: {
      cookie: cookie
    }
  };

  server.inject(opts, function (res) {

    res.payload = JSON.parse(res.payload);
    t.equals(res.statusCode, 200, "200 returned");
    t.ok(is.type(res.payload, "array"), "array returned");
    t.notOk(is.ok(res.payload), "array is empty");
    t.end();
  });
});
