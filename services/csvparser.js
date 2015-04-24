"use strict";

var fs    = require("fs");
var path  = require("path");
var parse = require("babyparse");
var is    = require("torf");

module.exports = parseCsv;

/**
 *	Payment csv data parser
 *
 *	@param  {String}    the relative path to the csv file.
 *	@param  {Object}    object bluprint depending on the csv file, with key and expected class
 *						it must be in the order of the column
 *	@return {Function}  a callback with an error and the results as an array of objects
 *
 *	Example:
 *
 *	var relativePath = "../file.csv";
 *	var bluprint = {
 *		datePaid:      {remove:false, type:"date"},
 *		memberId:      {remove:false, type:"string"},
 *		subscription:  {remove:false, type:"number"},
 *		donation:      {remove:false, type:"number"},
 *		events:        {remove:false, type:"number"},
 *		total:         {remove:true,  type:"number"},
 *		difference:    {remove:true,  type:"number"},
 *		typeCode:      {remove:false, type:"string"},
 *		listReference: {remove:false, type:"string"},
 *		notes:         {remove:false, type:"string"}
 *  };
 *
 */

function parseCsv (type, pathUrl, bluprint, callback){

	var arrayPath = pathUrl.split("/");
	var file      = arrayPath[arrayPath.length - 1];
	var name      = file.split(".")[0];
	var ws        = fs.createWriteStream(name + ".txt");
	var count     = 0;
	var store     = [];
	var mismatch  = [];
	var stop      = false;

	var absPath  = path.join(__dirname, pathUrl);
	var fileRead = fs.readFileSync(absPath, "utf8");

	parse.parse(fileRead, {
		delimiter: ";",
		step: function (results){

			var header;
			count = count + 1;

			if(is.ok(results.errors)){
				mismatch.push(results.errors);
			}else{			
				if(count === 0){
					console.log("Column: ", results.data[0]);
				}else{

					// store.push(stamp(results.data[0], bluprint));
					var record = JSON.stringify(stamp(results.data[0], bluprint));
					if(type === "members"){
						header = JSON.stringify({"index":{"_index":"clerk","_type":type,"_id": JSON.parse(record).id }});
					}else{
						header = JSON.stringify({"index":{"_index":"clerk","_type":type,"_id":"" + count + ""}});
					}

					ws.write(header + "\n");
					ws.write(record + "\n");
				}
			}
		},
		complete: function () {
			if(!stop){
				console.log("Done");
				stop = true;
				ws.end();
			}
		}
	});

	function stamp (data, stampPattern){

		var obj       = {};
		var stampKeys = Object.keys(stampPattern);

		if(count === 0 && (data.length !== stampKeys.length)){
			throw new Error({message: "Bluprint does not match with file csv columns"});
		}

		for(var ii = 0; ii < stampKeys.length; ii += 1){
			if(!is.ok(stampPattern[stampKeys[ii]].remove)){

				obj[stampKeys[ii]] = transform(data[ii], stampPattern[stampKeys[ii]].type);
			}
		}

		return obj;
	}

	function transform (value, type) {

		if(is.type(value, type)){
			return value;
		}else if(type === "number"){
			return parseInt(value);
		}else if(type === "date"){
			return new Date(value);
		}else if(type === "boolean"){
			return value === "VERO" ? true : false;
		}else if(type === "custom"){
			return value === "FALSO" ? "active" : "deleted";
		}
	}

	return callback(null, store);
}