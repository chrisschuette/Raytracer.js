define([], function () {
    var Scene = function () {
        var _camera;
        var _lights = [];
        var _spheres = [];
        var _ambientIntensity = 0.2;
        this.getAmbientIntensity = function() {
            return _ambientIntensity;
        }
        this.getCamera = function() { return _camera; }
        this.setCamera = function(cam) { _camera = cam; } 
        this.getLights = function() { return _lights; }
        this.addLight = function (light) { _lights[_lights.length] = light; }
    	this.getSpheres = function() { return _spheres; }
    	this.addSphere = function(sphere) { 
    		_spheres[_spheres.length] = sphere;
	     }
    };
    return Scene;
});
