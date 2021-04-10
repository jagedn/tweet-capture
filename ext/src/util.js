var Storage = new function(){

	this.get_option = function(option_name, default_value) {
		return localStorage.getItem(option_name) || default_value;
	};

	this.get_option_bool = function(option_name, default_value) {
		var value = localStorage.getItem(option_name);
		if (value == undefined) {
			return default_value;
		}
		return value == "true";
	};

	this.get_option_int = function(option_name, default_value) {
		var value = this.get_option(option_name, default_value);
		value = parseInt(value);
		if (isNaN(value)) {
			return default_value;
		}
		return value;
	};

	this.set_option = function(option_name, value) {
		localStorage.setItem(option_name, value);
	};

	this.unset_option = function(option_name) {
		localStorage.removeItem(option_name);
	};
};
