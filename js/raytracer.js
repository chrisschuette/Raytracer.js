define(['la'], function (LA) {
    var RayTracer = function (parameters) {
        /*
         * ray origin: P
         * ray direction : D
         * clipping volume: t_0, t_1
         */
        var _maxDepth = 4;
        var _closestHit = function(P, D, t_0, t_1) {
            var sqheres = parameters.scene.getSpheres();
            var A = LA.dot3(D,D);
            var noOfSpheres = sqheres.length;
            var closestSphere = -1; // none
            var shortestDistance; // undefined
            for (var i = 0; i < noOfSpheres; i=i+1) {
                var temp = LA.aplusbt3(P,sqheres[i].getPosition(),-1);
                var B = 2 * LA.dot3( temp , D );
                var C = LA.dot3(temp,temp) - sqheres[i].getRadius() * sqheres[i].getRadius();
                var discriminant = Math.sqrt( B * B - 4 * A * C );
                var s1 = (-B - discriminant) / (2 * A);
                var s2 = (-B + discriminant) / (2 * A);

                // valid hit?
                if( (t_0 < s1) && (s1 < t_1) && (!(s1 > shortestDistance) )) {
                    closestSphere = i;
                    shortestDistance = s1;
                }
                if( (t_0 < s2) && (s2 < t_1) && (!(s2 > shortestDistance) )) {
                    closestSphere = i;
                    shortestDistance = s2;
                }

            }
            return [closestSphere, shortestDistance];
        }

        var _traceRay = function(P,D,t_0,t_1, rayProperties) {

            
            var sqheres = parameters.scene.getSpheres();
            var lights = parameters.scene.getLights();
            var color = [255,255,255,255];
            var d = Math.sqrt(LA.dot3(D,D));

            // slightly randomize D
            // D[0] = D[0] + 0.001 * d * (Math.random() - 0.5);
            // D[1] = D[1] + 0.001 * d * (Math.random() - 0.5);
            // D[2] = D[2] + 0.001 * d * (Math.random() - 0.5);


            var s = _closestHit(P,D,t_0/d, t_1/d);

            // no intersection
            if(!s[1])
                return [0,0,0,255];
            
            // calculate intensity of intersection point
            var intensity = 0;

            // add ambient intensity
            intensity += parameters.scene.getAmbientIntensity();

            // calculate intersection point
            var X = LA.aplusbt3(P,D,s[1]);

            // calculate normal vector
            var N = LA.diff3( X , sqheres[s[0]].getPosition() );
            var n = LA.dot3(N,N);

            // add lighting from point lights
            for(var l = 0; l < lights.length; l++) {
                var L = LA.diff3( lights[l].getPosition(), X );
                // shoot a test ray from X to light position
                // if it intersects the point is in the shadow
                var stest = _closestHit(X,L,0.001,1);
                if(!stest[1]) {
                    var k = LA.dot3( N, L );
                    intensity += lights[l].getIntensity() * Math.max( 0, k  / Math.sqrt( LA.dot3(L,L) * n ) );
                    var M = LA.aplusbt3(L,N,-2*k/n);
                    intensity += lights[l].getIntensity() * Math.max( 0, Math.pow( LA.dot3(M,D) / Math.sqrt(LA.dot3(M,M) * LA.dot3(D,D)) , sqheres[s[0]].getExponent()) );

                }
            }


            var color = LA.mult4first3(sqheres[s[0]].getColor(), intensity);
            if(rayProperties.depth < _maxDepth) {
                var rayPropertiesRec = {
                    depth: rayProperties.depth+1,
                    debug: rayProperties.debug
                };

                var reflectedDirection = LA.aplusbt3(D,N,-2*LA.dot3(D,N)) ; // not normalized!
                var reflectedColor = _traceRay(X, reflectedDirection, t_0,t_1,rayPropertiesRec);

                colorOut = LA.add4first3( 
                    LA.mult4first3(color, (1 - sqheres[s[0]].getReflectivity())),
                    LA.mult4first3(reflectedColor,sqheres[s[0]].getReflectivity()));
            } else
                colorOut = color;
            return colorOut;
        }

        this.renderScene = function() {
            console.log("Rendering begin");
            var start = new Date().getTime();
            var camera = parameters.scene.getCamera();
            var h = parameters.canvas.getHeight();
            var w = parameters.canvas.getWidth();
            var rayProperties = {
                depth: 0,
                debug: false
            }
            for(x = -w/2; x < w/2; x++) {
                for(y = -h/2; y < h/2; y++) {
                    var color = _traceRay( camera.getPosition(), [x/w,y/w,-1], 0.01,10000, rayProperties);
                    parameters.canvas.setPixel([x+w/2,h/2-y],color);
                }
            }
            var time = (new Date().getTime()) - start;
            parameters.canvas.update();
            console.log("Rendering done (" + time + " ms)");
            console.log("Performace: " + Math.round(1000 * h * w / time) + " pixels / sec");
        }
    };
    return RayTracer;
});
