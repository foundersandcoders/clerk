"use strict";

module.exports = {

	_listeners: {},
	addListener: function (ev, fn){

		if(!this._listeners.hasOwnProperty(ev)){
			this._listeners[ev] = [];
		}
		this._listeners[ev].push(fn);
	},
	removeListener: function (ev, fn){

		if(!this._listeners.hasOwnProperty(ev)){
			return;
		} else {
			var index = this._listeners[ev].indexOf(fn);
			if(index > -1){
				this._listeners[ev].splice(index,1);
			}
		}
	},
	emit: function (ev){

		var argv = Array.prototype.slice.call(arguments, 1, arguments.length);

		if(this._listeners.hasOwnProperty(ev)){
			var ii = 0;
			var ln = this._listeners[ev].length;
			while(ii < ln){
				this._listeners[ev][ii].apply(null, argv);
				ii += 1;
			}
		}
	}
};