"use strict";

var request = require("request");
var membersUrl = process.env.MEMBERS_URL || "http://0.0.0.0:8010";

function newPayment (req, res) {


  var opts = {
    method: "GET",
    url: membersUrl + "/payments/" + req.params.id,
    json: true,
    headers: {
      authorization: req.auth.credentials.token
    }
  };

  request(opts, function (e, h, r) {

    var payment;
    if (e || h.statusCode === 404 || !r || !r.found) {
      return res(r).code(404);
    } else {
      payment = r._source;
      payment.id = r._id;
      payment.status = "deleted";

      opts = {
        method: "PUT",
        url: membersUrl + "/payments/" + req.params.id,
        body: payment,
        json: true,
        headers: {
          authorization: req.auth.credentials.token
        }
      };

      request(opts, function (e, h, r) {

        if (e || h.statusCode === 404 || !r) {
          return res({statusCode:500,status:"Server error", message: "Payment not deleted"}).code(500);
        } else {
          return res.redirect("/admin");
        }
      });
    }
    });
}

module.exports = newPayment;
