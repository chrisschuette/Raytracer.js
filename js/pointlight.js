define(['position'], function (Position) {
    var PointLight = function () {
        var _intensity = 0.8;
        this.getIntensity = function() {
        	return _intensity;
        }
        this.setIntensity = function(i) {
        	_intensity = i;
        }
    };
    PointLight.prototype = new Position();
    return PointLight;
});
