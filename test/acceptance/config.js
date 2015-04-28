"use strict";

module.exports = {
	options: {
		desiredCapabilities: {
			browserName: "chrome",
			logLevel: "verbose",
			coloredLogs: "true"
		}
	},
	specs: [
		require("./helpers/init.js"),
		require("./auth/signUp.js"),
		require("./auth/signIn.js"),
		require("./admin/createMember.js"),
		// require("./helpers/end.js")
	],
	service: {
		clerk: "http://localhost:8080"
	},
	signIn: {
		page: require("./auth/page.js").SignInPage
	},
	signUp: {
		email: "besart@clerk.com",
		password: "correct",
		cpassword: "correct",
		page: require("./auth/page.js").SignUpPage
	},
	admin: {
		manageMember: require("./admin/a.page.js").manageMember,
		addMember:    require("./admin/a.page.js").addMember,
		showMember:   require("./admin/a.page.js").showMember
	},
	layout: {
		navbar: require("./helpers/layout").Navbar
	}
};