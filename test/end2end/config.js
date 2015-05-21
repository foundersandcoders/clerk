var request = require("givit");

// conf.js
exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	multiCapabilities: [{
		browserName: 'chrome'
	}],
	specs: [
		"./signup.spec.js",
		// './signin.spec.js',
		// "./admin.home.spec.js",
		"./member.create.spec.js",
    	// "./payments.spec.js"
	],
	params: {
		admin: {
			email: 'admin@fac.com',
			password: 'correct'
		},
		service: {
			clerk: 'http://localhost:8080'
		},
		helpers: {
			pages: require(__dirname + "/pages.js"),
			mocks: require(__dirname + "/mocks.js"),
			object: require(__dirname + '/_helpers/form-input-object.js')
		}
	},
	// onPrepare: function(){
	// 	global.isAngularSite = function(flag){
	// 		browser.ignoreSynchronization = !flag;
	// 	};
	// },
	jasmineNodeOpts: {
		showColors: true,
		isVerbose: true,
		includeStackTrace: true
	},
	beforeLaunch: function(){
		// start a new database
		request({method: "DELETE", uri: "http://localhost:9200/clerk/_all"}, function () {
			console.log("Clear database.");
		});
	},
	onCleanUp: function(exitCode) {
		// if tests passed
		if(exitCode === 0) {
			// clean database and other stuff
		}
	}
}
