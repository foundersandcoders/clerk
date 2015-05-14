"use strict";


var h = require("virtual-dom/h");


module.exports = function (fn) {

	return h("div.uploads", [
		h("div.fileUpload", [
			h("span", "Upload members"),
			h("input#upload-members.upload", {
				type: "file"
			})
		]),
		h("div.fileUpload", [
			h("span", "Upload payments"),
			h("input#upload-payments.upload", {
				type: "file"
			})
		])
	]);
}