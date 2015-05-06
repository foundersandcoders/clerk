;(function () {
	"use strict";

	var utils = {
		is:            require("torf"),
		clean:         require("d-bap"),
		diff:          require('virtual-dom/diff'),
		patch:         require('virtual-dom/patch'),
		createElement: require('virtual-dom/create-element'),
		request:       require("xhr")
	};

	// components
	var search  = require("./components/search/index")(utils);
	var payment = require("./components/addpayment/index")(utils);
	// var viewPay = require("./components/displaypayments/index")(utils);
}());