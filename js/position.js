define([], function () {
    var Position = function () {
    	this._position = [0,0,0];
	    this.getPosition = function() {
	    	return this._position;
	    }

	    this.setPosition = function(position) {
	    	this._position = position;
	    }
    };
    return Position;
});
