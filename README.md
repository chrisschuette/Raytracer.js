Raytracer.js
============

raytracer.js is a simple raytracer for the Phong shading model implemented in JS. For more information see [here](http://www.christophschuette.com/blog/?p=134).

Raytracing is an elegant technique which allows to determine the radiance of light inciding on the eye of the observer from a particular direction by following the ray backwards out into the scene and examining the surface it was emitted from.

### Implementation. ###
I have implemented the simplest version of these ideas in a ray tracer written in JavaScript. Ray tracing is quite a computationally expensive algorithm and therefore implementing it in a scripting language is a spectacularly bad idea. Nonetheless, the attractive aspects about it where that it can be directly delivered into the browser.

### Dependencies. ###
The project relies on the following dependencies:
* [require.js](http://requirejs.org/)
* [jquery](http://jquery.com/) (only for user interface)
* [jquery-ui](http://jqueryui.com/) (only for user interface)

### Live Demo. ###
A [live](http://www.christophschuette.com/playground/raytracer/) demo can be found [here](http://www.christophschuette.com/playground/raytracer/).
