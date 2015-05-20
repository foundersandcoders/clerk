var h = require("virtual-dom/h");
module.exports.renderOptionsSelected = renderOptionsSelected.bind(undefined, h);

/**
 *	Renders a list of options with one selected;
 *
 *	@param {Array}  - array of objects like: {value: "string", description: "string"}
 *	@param {String} - value or description to be selected from options
 *	return {Object} - virtual dom object
**/

function renderOptionsSelected (h, options, selectedOption, placeholder) {

	var firstPlaceholderOption = [
		h("option", {
			value: "",
			disabled: true
		}, placeholder)
	];

	return firstPlaceholderOption.concat(
		options.map(function (elm){
			var selected = (elm.value === selectedOption || elm.description === selectedOption);

			return h("option", {
				value:    elm.value,
				selected: selected
			}, elm.description);
		})
	);
}

var memberTypes = module.exports.memberTypes = [{
		value: "annual-single",
		description: "Annual Single"
	}, {
		value: "annual-double",
		description: "Annual Double"
	},{
		value: "annual-family",
		description: "Annual Family"
	},{
		value: "life-single",
		description: "Life Single"
	},{
		value: "life-double",
		description: "Life Double"
	},{
		value: "group-annual",
		description: "Group Annual"
	},{
		value: "corporate-annual",
		description: "Corporate Annual"
	}
];

var newsType = module.exports.newsType = [{
		value: "post",
		description: "Post"
	},{
		value: "online",
		description: "Online"
	}
];