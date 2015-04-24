"use strict";

var request = require("request");
var url = process.env.BONSAI_URL || "http://" + process.env.ES_HOST + ":" + process.env.ES_PORT;

function drop (cb) {

  return request.del(url + "/" + process.env.ES_INDEX + "/_all", function (e, h, r) {

    return cb(JSON.parse(r));
  });
}

module.exports = drop;
