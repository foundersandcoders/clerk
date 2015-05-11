"use strict";

var clean = require("d-bap");

module.exports = function (charges) {

  return {
    create: function (req, res) {

      charges.create(clean.object(req.payload), req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    },
    find: function (req, res) {

      charges.find(req.query, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    },
    findOne: function (req, res) {

      charges.findOne({id: req.params.id}, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    },
    update: function (req, res) {

      charges.update({id: req.params.id}, req.payload, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    },
    del: function (req, res) {

      charges.del({id: req.params.id}, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    }
  };
};
