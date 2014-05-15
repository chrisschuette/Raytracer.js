requirejs.config({

    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'jqueryui': '../bower_components/jqueryui/ui/jquery-ui'
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'jqueryui': {
            deps: ['jquery']
        }
    }
});

require(['jqueryui','scene','raytracer','canvas','sphere','camera','pointlight'], function(JQuery,Scene, RayTracer,Canvas,Sphere,Camera,PointLight){
	var canvas = new Canvas('canvas');
    var scene = new Scene();
    var camera = new Camera();
    camera.setPosition([0,0,5]);
    scene.setCamera(camera);

    var sphere0 = new Sphere();
    sphere0.setRadius(2);
    sphere0.setPosition([3,1,-2]);
    sphere0.setColor([255,0,0,255]);
    sphere0.setReflectivity(0.4);
    sphere0.setExponent(200);
    scene.addSphere(sphere0);

    var sphere1 = new Sphere();
    sphere1.setRadius(2);
    sphere1.setPosition([-3,0,0]);
    sphere1.setColor([0,255,0,255]);
    sphere1.setReflectivity(0.3);
    sphere1.setExponent(10);
    scene.addSphere(sphere1);

    var sphere3 = new Sphere();
    sphere3.setRadius(1.5);
    sphere3.setPosition([-1,2,-3]);
    sphere3.setColor([255,255,255,255]);
    sphere3.setReflectivity(0.5);
    sphere3.setExponent(500);
    scene.addSphere(sphere3);

    var sphere2 = new Sphere();
    sphere2.setRadius(500);
    sphere2.setPosition([0,-501,0]);
    sphere2.setColor([255,255,255,255]);
    sphere2.setReflectivity(0.3);
    sphere2.setExponent(10);
    scene.addSphere(sphere2);

    var light0 = new PointLight();
    light0.setPosition([2,5,5]);
    light0.setIntensity(0.3);
    scene.addLight(light0);


    var light1 = new PointLight();
    light1.setPosition([-2,5,-5]);
    light1.setIntensity(0.3);
    scene.addLight(light1);

    var light2 = new PointLight();
    light2.setPosition([0,0.1,2]);
    light2.setIntensity(0.7);
    scene.addLight(light2);

    var parameters = {
    	canvas: canvas,
    	scene: scene
    };
    var raytracer = new RayTracer(parameters);

var renderButtonClicked = function(event) {
    event.preventDefault();
    var spheres = scene.getSpheres();
    // set colors
    spheres[0].setColor([
        parseInt($('#color1R').val()),
        parseInt($('#color1G').val()),
        parseInt($('#color1B').val()),
        255]);
    spheres[1].setColor([
        parseInt($('#color2R').val()),
        parseInt($('#color2G').val()),
        parseInt($('#color2B').val()),
        255]);
    spheres[2].setColor([
        parseInt($('#color3R').val()),
        parseInt($('#color3G').val()),
        parseInt($('#color3B').val()),
        255]);
    spheres[3].setColor([
        parseInt($('#colorGR').val()),
        parseInt($('#colorGG').val()),
        parseInt($('#colorGB').val()),
        255]);
    // set reflectivities
    spheres[0].setReflectivity(parseFloat($('#reflect1').val()));
    spheres[1].setReflectivity(parseFloat($('#reflect2').val()));
    spheres[2].setReflectivity(parseFloat($('#reflect3').val()));
    spheres[3].setReflectivity(parseFloat($('#reflectG').val()));

    raytracer.renderScene();
}

$('input:text, input:password, input[type=email]').button()
.addClass('ui-textfield')
.off('mouseenter').off('mousedown').off('keydown');
$( "input[type=submit], a, button" )
.button()
.click(renderButtonClicked);
});

