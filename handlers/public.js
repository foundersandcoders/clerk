"use strict";


module.exports = function () {

	return {
		login: function (req, res) {

			return res.view("login");
		},
		signup: function (req, res) {

			return res.view("signup");
		}
	}
};