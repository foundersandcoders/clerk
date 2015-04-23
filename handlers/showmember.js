"use strict";

var request    = require("request");
var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";
var clean      = require("d-bap");
var async      = require("async");

function showMember (req, res) {

    var optsMember = {
        method: "GET",
        url: membersUrl + "/members/" + req.params.id,
        headers: {
            authorization: req.auth.credentials.token
        },
        json: true
    };

    var optsPayments = {
        method: "GET",
        url: membersUrl + "/payments?memberId=" + req.params.id,
        headers: {
            authorization: req.auth.credentials.token
        },
        json: true
    };

    async.parallel(
        [
            function (callback){
                request(optsMember, function (e, h, r){
                    if (e || (h.statusCode === 404) || !r) {
                        callback(arguments, null);
                    } else {
                        callback(null, r);
                    }
                });
            },
            function (callback){
                request(optsPayments, function (e, h, r){
                    if (e || (h.statusCode === 404) || !r) {
                        callback(arguments, null);
                    } else {
                        callback(null, r);
                    }
                });
            }
        ],
        function (err, results){

            if(err){
                return res({ statusCode: 404, status: "Not found", message: "Member could not be found" }).code(404);
            }else{
                var member   = results[0]._source;
                member.id    = results[0]._id;
                var payments = results[1];
                return res.view("showmember", { member: clean.object(member), payments: payments });
            }
        }
    );
}

module.exports = showMember;
