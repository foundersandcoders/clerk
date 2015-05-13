"use strict";

var view  = require("./view");

module.exports = function (utils) {
	
	var tree, resultsNode, initial = true;

	function render () {

		// abstract this into single shared function
		if(initial){
			tree        = view();
			resultsNode = utils.createElement(tree);
			initial     = false;
			return resultsNode;
		} else {
			var newResults = view();
			var patches    = utils.diff(tree, newResults);
			resultsNode    = utils.patch(resultsNode, patches);
			tree           = resultsNode;
		}
	};

	try {
		document.querySelector(".container-controls").appendChild(render());
	} catch (e) {}

		var elem = document.querySelector('#upload');
		utils.upload(elem, {type: "text"}, function (err, file) {

			console.log("file: ",file);

			var opts = {
				method: "POST",
				uri: "/api/upload?type=payments",
				body: file[0].target.result
			};

			utils.request(opts, function (e, h, b){

				console.log(b);
			});
		});
	return;
};