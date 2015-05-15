"use strict";

var clean = require("d-bap");

module.exports = function (payments) {

  return {
    create: function (req, res) {

      payments.create(clean.object(req.payload), req.auth.credentials.token, function (e, r) {

        console.log(r.body)
        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    },
    find: function (req, res) {

      payments.find(req.query, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    },
    findOne: function (req, res) {

      payments.findOne({id: req.params.id}, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    },
    update: function (req, res) {

      payments.update({id: req.params.id}, req.payload, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    },
    del: function (req, res) {

      payments.del({id: req.params.id}, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    }
  };
};
