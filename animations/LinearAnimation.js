/**
 * Class LinearAnimation.
 * Creates a LinearAnimation, receiving control points to create the linear trajectory with.
 */
class LinearAnimation extends Animation{
    /**
     * LinearAnimation constructor
     *
     * @constructor
     * @this {LinearAnimation}
     * @param {CGFScene} scene Scene where LinearAnimation is being created in.
     * @param {string} id LinearAnimation ID.
     * @param {string} type LinearAnimation type.
     * @param {number} speed Object's speed when being animated with this LinearAnimation.
     * @param {Array} controlPoints Array containing the points needed to create the LinearAnimation's trajectory.
     */
    constructor(scene, id, type, speed, controlPoints){
        super(scene, id, type);
        this.speed = speed;
        this.controlPoints = controlPoints;
        this.animationMatrix = mat4.create();
        
        this.sectionValues = [];
        this.finalDistance = 0;
        for(var i = 0; i < this.controlPoints.length - 1; i++){
            var distance = Math.sqrt(
                                Math.pow(this.controlPoints[i+1][0] - this.controlPoints[i][0], 2)+
                                Math.pow(this.controlPoints[i+1][1] - this.controlPoints[i][1], 2)+
                                Math.pow(this.controlPoints[i+1][2] - this.controlPoints[i][2], 2));
            this.finalDistance += distance;
            this.sectionTimes.push(this.finalDistance/this.speed);

            var angCos = (this.controlPoints[i+1][0] - this.controlPoints[i][0])/distance;
            var angSin = (this.controlPoints[i+1][2] - this.controlPoints[i][2])/distance;
            var deltay = this.controlPoints[i+1][1] - this.controlPoints[i][1];

            if(deltay !== 0){
                deltay /= Math.abs(this.controlPoints[i+1][1] - this.controlPoints[i][1]);
            }

            var ang = Math.acos(angCos);

            var xVelocity = this.speed * angCos;
            var zVelocity = this.speed * angSin;
            var yVelocity = Math.sqrt(Math.pow(this.speed, 2) - Math.pow(xVelocity, 2) - Math.pow(zVelocity, 2))*deltay;

            this.sectionValues.push([xVelocity, yVelocity, zVelocity, ang]);
        }
        this.animationSpan = this.finalDistance / this.speed;

    }

    /**
     * Gets the LinearAnimation's animation matrix
     * 
     * @this {LinearAnimation}
     * @param {number} time Current time of the LinearAnimation.
     * @param {number} section Current section of the LinearAnimation.
     * @return {matrix} Returns the current LinearAnimation animation matrix, at the given time and section.
     */
    getAnimationMatrix(time, section){
       var sectionTime = time;
        
       if (section >= 1) {
           sectionTime -= this.sectionTimes[section - 1];
       }

       if(section < this.controlPoints.length - 1){

           var deltax = sectionTime * this.sectionValues[section][0];
           var deltay = sectionTime * this.sectionValues[section][1];
           var deltaz = sectionTime * this.sectionValues[section][2];

           var sectionVector = [
                this.controlPoints[section+1][0]-this.controlPoints[section][0],
                this.controlPoints[section+1][1]-this.controlPoints[section][1],
                this.controlPoints[section+1][2]-this.controlPoints[section][2]
           ];

           mat4.identity(this.animationMatrix);
           mat4.translate(this.animationMatrix, this.animationMatrix, [deltax, deltay, deltaz]);
           mat4.translate(this.animationMatrix, this.animationMatrix, [this.controlPoints[section][0], this.controlPoints[section][1], this.controlPoints[section][2]]);
           mat4.rotate(this.animationMatrix, this.animationMatrix, Math.atan(-sectionVector[2], sectionVector[0]) + Math.PI/2, [0, 1, 0]);
       }
       else{
          this.finished = true;
       }

       return this.animationMatrix;
    }
}