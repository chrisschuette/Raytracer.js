define([], function () {
    var LA = {
    	dot3: function(a,b){
			return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
		},
		aplusbt3: function(a,b,t) {
			return [ a[0] + b[0] * t, a[1] + b[1] * t, a[2] + b[2] * t ];
		},
		diff3: function(a,b) {
			return [ a[0] - b[0], a[1] - b[1], a[2] - b[2] ];
		},
		mult3: function(a,s) {
			return [ a[0]*s, a[1]*s, a[2]*s];
		},
		mult4first3: function(a,s) {
			return [ a[0]*s, a[1]*s, a[2]*s, a[3]];
		},
		toInt4: function(a) {
			return [ Math.round(a[0]),Math.round(a[1]),Math.round(a[2]), Math.round(a[3]) ];
		},
		add4: function(a,b) {
			return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
		},
		add4first3: function(a,b) {
			return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3]];
		},
		min4: function(a,s) {
			return [Math.min(a[0],s),Math.min(a[1],s),Math.min(a[2],s),Math.min(a[3],s)];
		}
    };
    return LA;
});
