"use strict";


var h = require("virtual-dom/h");


module.exports = function (fn) {

	return h("input#upload", {
		type: "file"
	});

}