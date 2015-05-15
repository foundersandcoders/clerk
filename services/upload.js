"use strict";


var request = require("request");
var parse   = require("babyparse");
var is      = require("torf");
var config  = require("../config.js");
var moment  = require("moment");


module.exports = function () {

	var opts = {
		method: "POST",
		uri: config.beekeeper + "/upload"
	};

	var that = {
		payments: function (req, cb) {

			var connection = request(opts);
			var csv  = req.payload.toString("utf8");
			var count = 0;
			var complete = false;

			parse.parse(csv, {
				delimiter: ";",
				step: function (results) {

					count += 1;

          			var subscription         = that._stamp(count, results.data[0], that._blue("sub"));
          			subscription.collection  = "charges";
					subscription.type        = "subscription";
					subscription.total       = subscription.subscription;
					subscription.description = "Subscription";

					var donation             = that._stamp(count, results.data[0], that._blue("donation"));
          			donation.collection      = "charges";
					donation.type            = "donation";
					donation.total           = donation.donation;
					donation.description = "Donation";

					var events               = that._stamp(count, results.data[0], that._blue("event"));
          			events.collection        = "charges";
					events.type              = "events";
					events.total             = events.events;
					events.description = "Event";

					var payment              = that._stamp(count, results.data[0], that._blue("payment"));
          			payment.collection       = "payments";
          			payment.description      = "Payment by " + payment.typeCode.split(" - ")[1];

					var paymentHeader = {"index":{"_index":"clerk","_type":"payments"}};
					var chargeHeader  = {"index":{"_index":"clerk","_type":"charges"}};


					if(donation.total && donation.total.toString() !== "0"){
						connection.write(JSON.stringify(paymentHeader) + "\n");
						connection.write(JSON.stringify(payment) + "\n");
					}
					connection.on("error", function (){
						console.log("Error: ", arguments);
					});

					if(donation.total && donation.total.toString() !== "0"){
						connection.write(JSON.stringify(chargeHeader) + "\n");
						connection.write(JSON.stringify(donation) + "\n");
					}
					if(events.total && events.total.toString() !== "0"){
						connection.write(JSON.stringify(chargeHeader) + "\n");
						connection.write(JSON.stringify(events) + "\n");
					}
					if(subscription.total && subscription.total.toString() !== "0"){
						connection.write(JSON.stringify(chargeHeader) + "\n");
						connection.write(JSON.stringify(subscription) + "\n");
					}
				},
				complete: function () {

					if (!complete) {
						complete = true;
						connection.end();
						return cb("Done paymnets");
					}
				}
			});
		},
		members: function (req, cb){
			var connection = request(opts);
			var csv  = req.payload.toString("utf8");
			var count = 0;
			var complete = false;

			parse.parse(csv, {
				delimiter: ";",
				step: function (results) {

					count += 1;

					var member       = that._stamp(count, results.data[0], that._blue("member"));
					var memberHeader = {"index":{"_index":"clerk","_type":"members", "_id": member.id}};


					connection.write(JSON.stringify(memberHeader) + "\n");
					connection.write(JSON.stringify(member) + "\n");

					connection.on("error", function (){
						console.log("Error: ", arguments);
					});
				},
				complete: function () {

					if (!complete) {
						complete = true;
						connection.end();
						return cb("Done members");
					}
				}
			});
		},
		_stamp: function (count, data, stampPattern){

			var obj       = {};
			var stampKeys = Object.keys(stampPattern);

			if(count === 0 && (data.length !== stampKeys.length)){
				throw new Error({message: "Blueprint does not match with file csv columns"});
			}

			for(var ii = 0; ii < stampKeys.length; ii += 1){
				if (!is.ok(stampPattern[stampKeys[ii]].remove)) {

					obj[stampKeys[ii]] = that._transform(data[ii], stampPattern[stampKeys[ii]].type);
				}
			}

			return obj;
		},
		_transform: function (value, type) {

			if(is.type(value, type)){
				return value;
			}else if(type === "number"){
				return parseInt(value);
			}else if(type === "date"){
        return moment(value, "DD-MM-YY").format();
			}else if(type === "boolean"){
				return value === "VERO" ? true : false;
			}else if(type === "custom"){
				return value === "FALSO" ? "active" : "deleted";
			}
		},
		_blue: function (type){

			var bluprintPayments;

			if (type === "payment") {

				bluprintPayments = {
					date:          {remove:false, type: "date"},
					memberId:      {remove:false, type: "string"},
					subscription:  {remove:true,  type: "number"},
					donation:      {remove:true,  type: "number"},
					events:        {remove:true,  type: "number"},
					total:         {remove:false, type: "number"},
					difference:    {remove:true,  type: "number"},
					typeCode:      {remove:false, type: "string"},
					listReference: {remove:false, type: "string"},
					notes:         {remove:false, type: "string"},
					deleted:       {remove:false, type: "boolean"}
				};
			} else if (type === "sub") {

				bluprintPayments = {
					date:          {remove:false, type: "date"},
					memberId:      {remove:false, type: "string"},
					subscription:  {remove:false, type: "number"},
					donation:      {remove:true, type: "number"},
					events:        {remove:true, type: "number"},
					total:         {remove:true,  type: "number"},
					difference:    {remove:true,  type: "number"},
					typeCode:      {remove:true, type: "string"},
					listReference: {remove:false, type: "string"},
					notes:         {remove:false, type: "string"},
					deleted:       {remove:false, type: "boolean"}
				};
			} else if (type === "donation") {
				bluprintPayments = {
					date:          {remove:false, type: "date"},
					memberId:      {remove:false, type: "string"},
					subscription:  {remove:true, type: "number"},
					donation:      {remove:false, type: "number"},
					events:        {remove:true, type: "number"},
					total:         {remove:true,  type: "number"},
					difference:    {remove:true,  type: "number"},
					typeCode:      {remove:true, type: "string"},
					listReference: {remove:false, type: "string"},
					notes:         {remove:false, type: "string"},
					deleted:       {remove:false, type: "boolean"}
				};
			} else if (type === "event") {
				bluprintPayments = {
					date:          {remove:false, type: "date"},
					memberId:      {remove:false, type: "string"},
					subscription:  {remove:true, type: "number"},
					donation:      {remove:true, type: "number"},
					events:        {remove:false, type: "number"},
					total:         {remove:true,  type: "number"},
					difference:    {remove:true,  type: "number"},
					typeCode:      {remove:true, type: "string"},
					listReference: {remove:false, type: "string"},
					notes:         {remove:false, type: "string"},
					deleted:       {remove:false, type: "boolean"}
				};
			}else if (type === "member") {
				bluprintPayments = {
					id:                   {remove:false, type: "string"},
					title:                {remove:false, type: "string"},
					initials:             {remove:false, type: "string"},
					lastName:             {remove:false, type: "string"},
					firstName:            {remove:false, type: "string"},
					address1:             {remove:false, type: "string"},
					address2:             {remove:false, type: "string"},
					address3:             {remove:false, type: "string"},
					address4:             {remove:false, type: "string"},
					county:               {remove:false, type: "string"},
					postcode:             {remove:false, type: "string"},
					deliverer:            {remove:false, type: "string"},
					homePhone:            {remove:false, type: "string"},
					mobilePhone:          {remove:false, type: "string"},
					workPhone:            {remove:false, type: "string"},
					birthday:             {remove:false, type: "date"},
					age:                  {remove:true,  type: "number"},
					email1:               {remove:false, type: "string"},
					email2:               {remove:false, type: "string"},
					emailBounced:         {remove:false, type: "boolean"},
					dateJoined:           {remove:false, type: "date"},
					membershipType:       {remove:false, type: "string"},
					dateTypeChanged:      {remove:false, type: "date"},
					lifePaymentDate:      {remove:false, type: "date"},
					membershipNotes:      {remove:false, type: "string"},
					giftAid:              {remove:false, type: "boolean"},
					dateGiftAidSigned:    {remove:false, type: "date"},
					dateGiftAidCancelled: {remove:false, type: "date"},
					standingOrder:        {remove:false, type: "boolean"},
					status:               {remove:false, type: "custom"},
					deletionDate:         {remove:false, type: "date"},
					deletionReason:       {remove:false, type: "string"},
					onlineMember:         {remove:false, type: "boolean"}
				};
			}

			return bluprintPayments;
		}
	};

	return that;
}
