function Patch(scene, id, orderU, orderV, partsU, partsV, controlPoints){
    CGFobject.call(this, scene);

    this.id = id;
    this.orderU = orderU;
    this.orderV = orderV;
    this.partsU = partsU;
    this.partsV = partsV;
    this.controlPoints = controlPoints;
    

    this.nurbsObj = scene.makeSurface(orderU, orderV, controlPoints, partsU, partsV);
};

    Patch.prototype = Object.create(CGFobject.prototype);
    Patch.prototype.constructor = Patch;

    
Patch.prototype.makeSurface = function(id, degree1, degree2, controltexes, translation){

    var knots1 = this.getKnotsVector(degree1);
    var knots2 = this.getKnotsVector(degree2);

    var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controltexes);
    
    getSurfacePoint = function(u, v){
        return nurbsSurface.getPoint(u, v);
    };

    var obj = new CGFnurbsObject(this, getSurfacePoint, 20, 20);
    this.surfaces.push(obj);
}

Patch.prototype.getKnotsVector = function(degree) {

    var v = new Array();
    
    for(var i=0; i<=degree; i++){
        v.push(0);
    }
    
    for(var i=0; i<=degree; i++) {
        v.puh(1);
    }
    
    return v;
} 



    Patch.prototype.display = function() {
        this.nurbsObj.display();
    }


