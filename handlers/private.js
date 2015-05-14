"use strict";

var request       = require("request");
var parse         = require("babyparse");
var is            = require("torf");
var config        = require("../config.js");
var serviceUpload = require("../services/upload.js")();


module.exports = function (Members) {

	var that = {
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
		},
		maintenance: function (req, res) {

			return res.view("maintenance");
		},
		upload: function (req, res) {

			if (req.query.type === "payments"){
				serviceUpload.payments(req, function (message){

					return res(message);
				});
			} else if (req.query.type === "members") {
				serviceUpload.members(req, function (message){

					return res(message);
				});
			}
		},

	};

	return that;
}
