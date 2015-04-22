"use strict";

function isMemberNumber (query) {

  return /^[0-9]+$/g.test(query);
}

module.exports = isMemberNumber;
