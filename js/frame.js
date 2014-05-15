define(['position'], function (Position) {
    var Frame = function () {
        this._forward = [0,0,-1];
        this._up = [0,1,0];
        this.setOrientiation = function(fwd, up) { this._forward = fwd; _up = up; }
        this.getUp = function() { return this._up; }
        this.getForward = function() { return this._forward; }
    };
    Frame.prototype = new Position();
    return Frame;
});
