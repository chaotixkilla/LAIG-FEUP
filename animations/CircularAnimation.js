/**
 * Class CircularAnimation.
 * Creates a CircularAnimation, given a central point, initial angle and rotation.
 */
class CircularAnimation extends Animation{
    /**
     * CircularAnimation constructor
     *
     * @constructor
     * @this {CircularAnimation}
     * @param {CGFScene} scene Scene where CircularAnimation is being created in.
     * @param {string} id CircularAnimation ID.
     * @param {string} type CircularAnimation type.
     * @param {number} speed Object's speed when being animated with this BezierAnimation.
     * @param {number} centerx X coordinate of the central point of the CircularAnimation.
     * @param {number} centery Y coordinate of the central point of the CircularAnimation.
     * @param {number} centerz Z coordinate of the central point of the CircularAnimation.
     * @param {number} radius Radius relative to the central point for the object to execute the CircularAnimation.
     * @param {number} startAng Starting angle of the animation.
     * @param {number} rotAng Angle incremented to the object after the CircularAnimation is finished.
     */
    constructor(scene, id, type, speed, centerx, centery, centerz, radius, startAng, rotAng){
        super(scene, id, type);
        this.speed = speed;
        this.centerx = centerx;
        this.centery = centery;
        this.centerz = centerz;
        this.radius = radius;
        this.startAng = startAng;
        this.rotAng = rotAng;

        //arc length
        this.arcLength = this.radius * this.rotAng;

        //animation time span
        this.animationSpan = this.arcLength / this.speed;

        //animation not started
        this.currAng = 0;
        this.deltaAng = 0;

        //angular velocity
        this.angularVelocity = this.speed / this.radius;

        //animationMatrix
        this.animationMatrix = mat4.create();

        this.sectionTimes.push(this.animationSpan);
    }

    /**
     * Gets the CircularAnimation's animation matrix
     * 
     * @this {CircularAnimation}
     * @param {number} time Current time of the CircularAnimation.
     * @param {number} section Current section of the CircularAnimation.
     * @return {matrix} Returns the current CircularAnimation animation matrix, at the given time and section.
     */
    getAnimationMatrix(time, section){
        this.currAng = this.angularVelocity * time;
        if(this.currAng >= this.rotAng){
            this.finished = true;
        }
        else{
            mat4.identity(this.animationMatrix);
            var deltaAng = this.startAng + this.currAng;
            mat4.translate(this.animationMatrix, this.animationMatrix, [this.centerx, this.centery, this.centerz]);
            mat4.rotate(this.animationMatrix, this.animationMatrix, deltaAng, [0, 1, 0]);
            mat4.translate(this.animationMatrix, this.animationMatrix, [this.radius, 0, 0]);
            mat4.rotate(this.animationMatrix, this.animationMatrix, Math.PI, [0, 1, 0]);
            }
        return this.animationMatrix;
    }
}