"use strict";


var view  = require("./view");
var moment = require("moment");


module.exports = function (utils, state) {

	var that = {};

	that.render = function (payments) {

		return view(payments, state.selected(), that.select, that.getData, that.deletePayment, utils);
	};

	that.deletePayment = function () {

      var deleteMe = state.selected();

      deleteMe.forEach(function (record) {

        var opts = {
          method: "DELETE",
          url: "/api/" + record.collection + "/" + record.id
        };

        utils.request(opts, function (e, h, b) {

          var payments = state.payments();

          payments.forEach(function (p, i) {

            if (p.id === JSON.parse(b).id) {
              payments.splice(i, 1);
            }
          });
          state.payments.set(payments);
        });
      });

	};

  that.select = function (ref) {

    return function () {
      var selected = state.selected();
      var index;

      var isSelected = selected.some(function (r, i) {

        if (r.id === ref.id) {
          index = i;
          return true;
        } else {
          return false;
        }
      });

      if (isSelected) {
        selected.splice(index, 1);
      } else {
        selected.push(ref);
      }
      state.selected.set(selected);
    };
  };

	that.getData = function () {

		var store = [];
		var count = 0;

		utils.request(_createOptions("payments"), function (e, h, b) {

			store = store.concat(JSON.parse(b));
			count += 1;

			if(count === 2) {
				store.sort(function (a, b) {

          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        calculateBalanceDue(store);
        store.reverse();
				state.payments.set(store);
			}
		});

		utils.request(_createOptions("charges"), function (e, h, b) {

			store = store.concat(JSON.parse(b));
			count += 1;

			if(count === 2) {
				store.sort(function (a, b) {

				  return new Date(a.date).getTime() - new Date(b.date).getTime();
				});
        calculateBalanceDue(store);
        store.reverse();
				state.payments.set(store);
			}
		});
	};

	that.getData();
	return that;
};

function calculateBalanceDue (list) {

  list.reduce(function (a, b) {

    var cost;
    if (b.collection === "charges") {
      cost = Number(b.total);
    } else {
      cost = 0 - Number(b.total);
    }
    var due = a + cost;
    b.balanceDue = String(due);
    return due;
  }, 0);
}

function _createOptions (item) {

	try{
		var id = document.querySelector("#member-id").textContent;
	} catch(e) {
		console.log("Erro: ", e);
	}

	return {
		method: "GET",
		url: "/api/" + item + "?memberId=" + id
	}
}
