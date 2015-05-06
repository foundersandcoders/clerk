"use strict";

module.exports = function (Members) {

	return {
		admin: function (req, res) {

			return res.view("admin-home");
		},
		addmember: function (req, res) {

			return res.view("new-member");
		},
		member: function (req, res) {

			Members
			.findOne({id: req.params.id}, req.auth.credentials.token, function (err, r){

				res.view("view-member", {member: r.body});
			});
		}
	}
}