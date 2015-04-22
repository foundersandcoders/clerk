"use strict";

var test = require("tape");
var isMemberNumber = require("../lib/ismembernumber.js");

test("#isMumberNumber passed name", function (t) {


  t.notOk(isMemberNumber(undefined), "returned false");
  t.notOk(isMemberNumber({}), "returned false");
  t.notOk(isMemberNumber("uaoeu"), "returned false");
  t.notOk(isMemberNumber("9hthd9dh"), "returned false");
  t.notOk(isMemberNumber(null), "returned false");
  t.end();
});

test("#isMumberNumber passed member number", function (t) {


  t.ok(isMemberNumber("152342"), "returns true");
  t.ok(isMemberNumber("0"), "returns true");
  t.ok(isMemberNumber("12341234"), "returns true");
  t.ok(isMemberNumber("0987"), "returns true");
  t.ok(isMemberNumber("23412521341252143"), "returns true");
  t.end();
});
