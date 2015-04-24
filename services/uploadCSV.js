"use strict";


var parseCSV = require("./csvparser");

var bluprintPayments = {
	datePaid:      {remove:false, type: "date"},
	memberId:      {remove:false, type: "string"},
	subscription:  {remove:false, type: "number"},
	donation:      {remove:false, type: "number"},
	events:        {remove:false, type: "number"},
	total:         {remove:true,  type: "number"},
	difference:    {remove:true,  type: "number"},
	typeCode:      {remove:false, type: "string"},
	listReference: {remove:false, type: "string"},
	notes:         {remove:false, type: "string"},
	deleted:       {remove:false, type: "boolean"}
};

var bluprintMembers = {
	id:                        {remove:false, type: "string"},
	title:                     {remove:false, type: "string"},
	initials:                  {remove:false, type: "string"},
	lastName:                  {remove:false, type: "string"},
	firstName:                 {remove:false, type: "string"},
	address1:                  {remove:false, type: "string"},
	address2:                  {remove:false, type: "string"},
	address3:                  {remove:false, type: "string"},
	address4:                  {remove:false, type: "string"},
	county:                    {remove:false, type: "string"},
	postcode:                  {remove:false, type: "string"},
	deliverer:                 {remove:false, type: "string"},
	homePhone:                 {remove:false, type: "string"},
	mobilePhone:               {remove:false, type: "string"},
	workPhone:                 {remove:false, type: "string"},
	birthday:                  {remove:false, type: "date"},
	age:                       {remove:true,  type: "number"},
	email1:                    {remove:false, type: "string"},
	email2:                    {remove:false, type: "string"},
	emailBounced:              {remove:false, type: "boolean"},
	dateJoined:                {remove:false, type: "date"},
	membershipType:            {remove:false, type: "string"},
	dateTypeChanged:           {remove:false, type: "date"},
	lifePaymentDate:           {remove:false, type: "date"},
	membershipNotes:           {remove:false, type: "string"},
	giftAid:                   {remove:false, type: "boolean"},
	dateGiftAidSigned:         {remove:false, type: "date"},
	dateGiftAidCancelled:      {remove:false, type: "date"},
	standingOrder:             {remove:false, type: "boolean"},
	status:                    {remove:false, type: "custom"},
	deletionDate:              {remove:false, type: "date"},
	deletionReason:            {remove:false, type: "string"},
	onlineMember:              {remove:false, type: "boolean"}
};

parseCSV("payments", "payments.csv", bluprintPayments, function () {

	console.log("Payment in: payments.txt");
});

parseCSV("members", "activeMembers.csv", bluprintMembers, function () {

	console.log("Active members in: activeMembers.txt");
});

parseCSV("members", "deletedMembers.csv", bluprintMembers, function () {

	console.log("Deleted members in deletedMembers");
});