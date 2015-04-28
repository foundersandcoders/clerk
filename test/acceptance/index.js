"use strict";

var webdriverio = require("webdriverio");
var test        = require("tape");
var params      = require("./config");

var client      = webdriverio.remote(params.options);

params.specs.forEach(function (fn){

	fn(params, client, test);
});