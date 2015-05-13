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
		upload: function (req, res) {

			// if query is payments
			// upload payments
			// upload charges
			// else if query is members and status is active
			// upload active members
			// else if query is members and status is deleted
			// upload deleted members
			console.log("Got your request");
			console.log("pl:", req.payload);
			if (req.query.type === "payments"){
				serviceUpload.payments(req, function (message){

					console.log(message);
					return res(message);
				});
			} else if (req.query.type === "members") {
				serviceUpload.members(req, function (message){

					console.log(message);
					return res(message);
				});
			}
		},
		
	};

	return that;
}