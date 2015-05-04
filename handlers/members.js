"use strict";

var clean = require("d-bap");

module.exports = function (members) {

  return {
    create: function (req, res) {

      var member = clean.object(req.payload);
      member.status = "active";

      members.create(member, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body);
        }
      });
    },
    find: function (req, res) {

      members.find(req.query, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    },
    findOne: function (req, res) {

      members.findOne({id: req.params.id}, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body).code(r.statusCode);
        }
      });
    },
    update: function (req, res) {

      var member = clean.object(req.payload);

      members.update({id: req.params.id}, member, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r.body);
        }
      });
    },
    del: function (req, res) {

      members.update({id: req.params.id}, {
        status: "deleted",
        deletionReason: req.payload.deletionReason,
        deletionDate: new Date().toISOString().split("T")[0]
      }, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r);
        }
      });
    },
    reactivate: function (req, res) {

      members.update({id: req.params.id}, {
        status: "active",
        deletionReason: null,
        deletionDate: null
      }, req.auth.credentials.token, function (e, r) {

        if (e) {
          return res(e).code(500);
        } else {
          return res(r);
        }
      });
    }
  };
};
