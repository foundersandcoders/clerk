"use strict";


var hub  = require("../../assets/js/lib/hub.js");
var test = require("tape");

test("Hub should exists", function (t) {

	t.ok(hub, "exists");
	t.end();
});

test("add listener should add the fn to listener", function (t){

	hub.addListener("bes", function (){return "wil"});

	t.equals(hub._listeners.bes.length, 1, "listener added");
	t.equals(hub._listeners.bes[0](), "wil", "return wil");
	t.end();
});

test("Hub emit: ", function (t){

	var count = 0;

	t.test("addListener", function (st){

		hub.addListener("click", callback);

		function callback (){

			var a = [];

			for(var ii = 0; ii < arguments.length; ii += 1){
				a.push(arguments[ii]);
			}

			count += a.length;

			return a;
		};

		st.equals(hub._listeners.click.length, 1, "listener added");
		st.deepEquals(hub._listeners.click[0](), [], "return empty");
		st.deepEquals(hub._listeners.click[0](1), [1], "return args");
		st.notEquals(hub._listeners.click[0](), [1], "return false");
		st.end();
	});

	t.test("emit should trigger listener", function (st){

		// reset counter
		count = 0;
		hub.emit("click", 1, 2);

		st.equals(count, 2, "callback fired with two arguments");
		st.end();
	});

	t.test("add listener with callback", function (st){

		var cbCounter = 0;
		hub.addListener("callback", function (cb){

			return cb(7);
		});

		hub.emit("callback", function (num){

			cbCounter += num;
		});

		t.equals(cbCounter, 7, "callback called");
		st.end();
	});

	t.test("remove listener listener", function (st){

		var rvCounter = 0;
		function onChange (n) {
			rvCounter = n;
		}
		hub.addListener("change", onChange);

		hub.emit("change", 3);

		t.equals(rvCounter, 3, "listener called");

		hub.removeListener("change", onChange);

		hub.emit("change", 5);
		
		t.equals(rvCounter, 3, "listener not called");
		t.equals(hub._listeners.change.length, 0, "listener removed");

		st.end();
	});
});
















