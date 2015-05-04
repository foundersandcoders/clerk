"use strict";

module.exports = function () {

	return {
		admin: function (req, res) {

			res.view("admin-home");
		}
	}
}