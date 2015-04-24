"use strict";

var test = require("tape");
var server = require("../lib/server.js");
var drop = require("./z_drop");
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

test("GET /addmember should respond with 302 if not logged in", function (t) {

  var opts = {
		method: "GET",
		url: "/addmember"
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
    biscuit = res.headers["set-cookie"][0].split(";")[0];
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

test("POST /members should return 302 member successfully created", function (t) {

  var opts = {
		method: "POST",
		url: "/members",
    headers: {
      cookie: biscuit
    },
    payload: {
      id: 12345,
      title: "Cpt.",
      initials: "WSF",
      birthday: "1992-08-11",
      firstname: "William",
      surname: "Fisher",
      addressLine1: "33 Middle Road",
      addressLine2: "Fugders Hill",
      addressLine3: "Chad",
      addressLine4: "Guyana",
      addressLine5: "The World",
      postcode: "N2 322",
      deliverer: "HPHUA",
      homePhone: "12341234",
      mobilePhone: "2345245",
      workPhone: "41324132",
      email1: "thebest@gmail.com",
      email2: "god@hotmail.co.uk",
      emailBounced: false,
      dateJoined: "2015-01-25",
      membershipType: "lifeSingle",
      dateMembershipTypeChanged: "2015-04-22",
      gad: true,
      dateGadSigned: "2015-01-3",
      paysByStandingOrder: true,
      onlineMember: false,
      membershipNotes: "This guy is pretty cool"
    }
	};

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 received");
    t.equals(res.raw.res._headers.location, "/members/12345", "redirect url matches expected");

    t.end();
	});
});

test("member should exist in database", function (t) {

  members.read(12345, function (res) {

    t.ok(res.found, "member exists in database");
    t.end();
  });
});


test("POST /payments should return 302 if successfully created", function (t) {

  var opts = {
    method: "POST",
    url: "/payments",
    headers: {
      cookie: biscuit
    },
    payload: {
      memberId: 12345,
      datePaid: new Date(),
      donation: 10,
      typeCode: "BACSR"
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 received");
    t.equals(res.raw.res._headers.location, "/members/12345", "redirect url matches expected");

    t.end();
  });
});


test("payment should exist in database", function (t) {

  // wait because ES not searchable within ~1000ms
  setTimeout(function () {

    payments.search("memberId", 12345, function (res) {

      // console.log(res.hits);
      t.equals(res.hits.hits.length, 1, "payment exists in database");
      paymentId = res.hits.hits[0]._id;
      t.end();
    });
  }, 1500);
});


test("POST /payments/{id} should return 302 if valid token and valid payment", function (t){

  var opts = {
    method: "POST",
    url: "/payments/" + paymentId,
    headers: {
      cookie: biscuit
    },
    payload: {
      memberId: 12345,
      datePaid: new Date(),
      donation: 10,
      typeCode: "CAFR"
    }
  };

  server.inject(opts, function (res) {
    console.log(res.payload);
    t.equals(res.statusCode, 302, "302 received");
    t.equals(res.raw.res._headers.location, "/members/12345", "redirect url matches expected");
    t.end();
  });
});


test("POST /payments/{id} should return 400 if payments is INVALID", function (t) {

  var opts = {
    method: "POST",
    url: "/payments/" + paymentId,
    headers: {
      cookie: biscuit
    },
    payload: {
      memberId: 12345,
      datePaid: new Date()
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 400, "400 received");
    t.equals(JSON.parse(res.payload).message, "Payment could not be updated", "right message");

    t.end();
  });
});

test("POST /payments/{id}/delete should return 404 if payments ID is invalid", function (t) {

  var opts = {
    method: "POST",
    url: "/payments/9999/delete",
    headers: {
      cookie: biscuit
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 404, "404 received");
    t.end();
  });
});

test("POST /payments/{id}/delete should return 302 if payments ID is found", function (t) {

  var opts = {
    method: "POST",
    url: "/payments/" + paymentId + "/delete",
    headers: {
      cookie: biscuit
    },
    payload: {
      memberId: 12345
    }
  };

  server.inject(opts, function (res) {

    t.equals(res.statusCode, 302, "302 received");
    t.equals(res.raw.res._headers.location, "/admin", "redirect url matches expected=");
    t.end();
  });
});

