/**
 * Class Animation.
 * Creates and stores information of all animations.
 */
class Animation{
    /**
     * Animation constructor
     *
     * @constructor
     * @this {Animation}
     * @param {CGFScene} scene Scene where Animation is being created in.
     * @param {string} id Animation ID.
     * @param {string} type Animation type.
     */
    constructor(scene, id, type){
        this.scene = scene;
        this.id = id;
        this.type = type;

        //useful to store each section animation time, useful for linear and combo animations
        this.sectionTimes = [];

        this.animationSpan = 0;
        this.finished = false;
    }

    /**
     * Function to get the entire animation duration.
     * 
     * @this {Animation}
     * @return Returns the entire duration of the animation.
     */
    getAnimationSpan(){
        return this.animationSpan;
    }

    /**
     * Checks if the animation is finished.
     * 
     * @this {Animation}
     * @return Returns true if the animation is finished, false otherwise.
     */
    finished(){
        return this.finished;
    }
}