"use strict";

module.exports = function () {

	return {
		admin: function (req, res) {

			res.view("adminhome");
		},
		addmember: function (req, res) {

			res.view("newmember");
		}
	}
}