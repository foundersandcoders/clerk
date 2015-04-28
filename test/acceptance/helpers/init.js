"use strict";

module.exports = function (params, browser, test){

	test("Start webdriver", function (t){

		browser.init();
		t.end();
	});
};