"use strict";

module.exports = function (params, browser, test){

	test("Stop and close webdriver", function (t){

		browser.end();
		t.end();
	});
};