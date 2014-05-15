define(['position'], function (Position) {
    var Sphere = function() {
        var _radius = 1;
        var _color = [255,255,255,255];
        var _reflectivity = 0.5;
        var _exponent = 10;
        this.setRadius = function(r) { _radius = r; }
        this.getRadius = function() { return _radius; }
        this.setColor = function(c) { _color = c; }
        this.getColor = function() { return _color; }
        this.getReflectivity = function() {
            return _reflectivity;
        }
        this.setReflectivity = function(r) {
            _reflectivity = r;
        }
        this.getExponent = function() {
            return _exponent;
        }
        this.setExponent = function(e) {
            _exponent = e;
        }
    };
    Sphere.prototype = new Position();
    return Sphere;
});
