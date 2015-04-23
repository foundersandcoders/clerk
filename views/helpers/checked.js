"use strict";

function checked (current) {

  return (typeof current !== "undefined") ? "checked" : "";
}

module.exports = checked;
