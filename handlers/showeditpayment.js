"use strict";

var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";
var request    = require("request");

function showEditPayment (req, res) {


    var opts = {
        method: "GET",
        url: membersUrl + "/payments/" + req.params.idPay,
        json: true,
        headers: {
            authorization: req.auth.credentials.token
        }
    };

    request(opts, function (e, h, r) {

        if (e || h.statusCode === 404 || !r) {
            return res(r).code(404);
        } else {
            var obj = r._source;
            obj.id  = r._id;
          return res.view("editpayment", {payment:obj, types: require("./helpers.js")});
        }
    });
}

module.exports = showEditPayment;
