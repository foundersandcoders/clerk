"use strict";

var test = require("tape");
var server = require("../lib/server.js");

var biscuit;

test("GET /addmember should respond with 302 if not logged in", function (t) {
	var request = {
		method: "GET",
		url: "/addmember"
	};

	server.inject(request, function (res) {

		t.equals(res.statusCode, 302, "302 received");
		t.end();
	});
});

test("GET /addmember should respond with 200 if logged in as admin", function (t) {

	var request = {
		method: "GET",
		url: "/addmember",
		headers: {
			cookie: biscuit
		}
	};

	server.inject(request, function (res) {
		t.equals(res.statusCode, 200, "200 received");
		t.end();
	});
});

test("GET /addmember should respond with 302 if session has ended", function (t) {

	var request = {
		method: "GET",
		url: "/addmember",
		headers: {
			cookie: biscuit
		}
	};
	server.inject(request, function (res) {

		t.equals(res.statusCode, 302, "302 received");
		t.end();
	});
});

test("GET /addmember should respond with 302 if session has ended", function (t) {

	var request = {
		method: "GET",
		url: "/addmember",
		headers: {
			cookie: biscuit
		}
	};

	server.inject(request, function (res) {

		t.equals(res.statusCode, 302, "302 received");
		t.end();
	});
});
