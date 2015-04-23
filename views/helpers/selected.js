"use strict";

function selected (current, option) {

  return (current === option) ? "selected" : "";
}

module.exports = selected;
