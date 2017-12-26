/**
 * Class BezierAnimation.
 * Creates a BezierAnimation, receiving four control points to create a bezier curve with.
 */
class BezierAnimation extends Animation{
    /**
     * BezierAnimation constructor
     *
     * @constructor
     * @this {BezierAnimation}
     * @param {CGFScene} scene Scene where BezierAnimation is being created in.
     * @param {string} id BezierAnimation ID.
     * @param {string} type BezierAnimation type.
     * @param {number} speed Object's speed when being animated with this BezierAnimation.
     * @param {Array} controlPoints Array containing the four points needed to create the BezierAnimation's trajectory.
     */
    constructor(scene, id, type, speed, controlPoints){
        super(scene, id, type);
        this.speed = speed;
        this.controlPoints = controlPoints;
        this.animationMatrix = mat4.create();

        this.p1 = this.controlPoints[0];
        this.p2 = this.controlPoints[1];
        this.p3 = this.controlPoints[2];
        this.p4 = this.controlPoints[3];

        this.sectionValues = [];
        
        //calcular pontos médios para definir trajectória
        var p12 = [(this.p1[0] - this.p2[0])/2, (this.p1[1] - this.p2[1])/2, (this.p1[2] - this.p2[2])/2];
        var p23 = [(this.p2[0] - this.p3[0])/2, (this.p2[1] - this.p3[1])/2, (this.p2[2] - this.p3[2])/2];
        var p34 = [(this.p3[0] - this.p4[0])/2, (this.p3[1] - this.p4[1])/2, (this.p3[2] - this.p4[2])/2];

        var p123 = [(p12[0] - p23[0])/2, (p12[1] - p23[1])/2, (p12[2] - p23[2])/2];
        var p234 = [(p23[0] - p34[0])/2, (p23[1] - p34[1])/2, (p23[2] - p34[2])/2];

        var p1234 = [(p123[0] - p234[0])/2, (p123[1] - p234[1])/2, (p123[2] - p234[2])/2];
    
        //calculates total distance
        this.totalDistance = this.getDistanceBetweenPoints(this.p1, p12) + this.getDistanceBetweenPoints(p12, p123) +
                             this.getDistanceBetweenPoints(p123, p1234) + this.getDistanceBetweenPoints(p1234, p234) +
                             this.getDistanceBetweenPoints(p234, p34) + this.getDistanceBetweenPoints(p34, this.p4);
    
        this.animationSpan = this.totalDistance/this.speed;
        this.sectionTimes.push(this.animationSpan);
    }

    /**
     * Calculates the distance between two points.
     * 
     * @this {BezierAnimation}
     * @param {Array} P1 First point.
     * @param {Array} P2 Second point.
     * @return Returns the distance between P1 and P2. 
     */
    getDistanceBetweenPoints(P1, P2){
        return Math.sqrt(Math.pow(P2[0]-P1[0], 2) + Math.pow(P2[1]-P1[1], 2) + Math.pow(P2[2]-P1[2], 2));
    }

    /**
     * Gets the BezierAnimation's animation matrix
     * 
     * @this {BezierAnimation}
     * @param {number} time Current time of the BezierAnimation.
     * @param {number} section Current section of the BezierAnimation.
     * @return {matrix} Returns the current BezierAnimation animation matrix, at the given time and section.
     */
    getAnimationMatrix(time, section){
        //normalizes the BezierAnimation t (so the coordinates update can be done according to the Bezier curve's formula)
        var t = time / this.animationSpan;

        if(t <= 1){
            var x = Math.pow(1 - t, 3) * this.p1[0] 
                    + 3 * t * Math.pow(1 - t, 2) * this.p2[0]
                    + 3 * t * t * (1 - t) * this.p3[0]
                    + t * t * t * this.p4[0];
            var y = Math.pow(1 - t, 3) * this.p1[1] 
                    + 3 * t * Math.pow(1 - t, 2) * this.p2[1]
                    + 3 * t * t * (1 - t) * this.p3[1]
                    + t * t * t * this.p4[1];
            var z = Math.pow(1 - t, 3) * this.p1[2] 
                    + 3 * t * Math.pow(1 - t, 2) * this.p2[2]
                    + 3 * t * t * (1 - t) * this.p3[2]
                    + t * t * t * this.p4[2];
  
            var deltax = 3 * this.p4[0] * t * t
                 - 3 * this.p3[0] * t * t
                 + 6 * this.p3[0] * (1 - t) * t
                 - 6 * this.p2[0] * (1 - t) * t
                 + 3 * this.p2[0] * Math.pow(1 - t, 2)
                 - 3 * this.p1[0] * Math.pow(1 - t, 2);

            var deltaz = 3 * this.p4[2] * t * t
                 - 3 * this.p3[2] * t * t
                 + 6 * this.p3[2] * (1 - t) * t
                 - 6 * this.p2[2] * (1 - t) * t
                 + 3 * this.p2[2] * Math.pow(1 - t, 2)
                 - 3 * this.p1[2] * Math.pow(1 - t, 2);

             mat4.identity(this.animationMatrix);
             mat4.translate(this.animationMatrix, this.animationMatrix, [x, y, z]);
             mat4.rotate(this.animationMatrix, this.animationMatrix, Math.atan(-deltaz, deltax) + Math.PI/2, [0, 1, 0]);
        }
        else{
            this.finished = true;
        }

        return this.animationMatrix;
    }
}