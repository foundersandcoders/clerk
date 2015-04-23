"use strict";

//<option value="type" selected>type</option>

function option (types, current) {

  var options = "";

  types.forEach(function (type) {


    var opt = "<option value='" + type + "'";
    opt += (type === current) ? "selected>" : ">";
    opt += type + "</option>";

    options += opt;
  });


  return options;
}

module.exports = option;
