/**
 * Class ComboAnimation.
 * Creates a ComboAnimation using all other existing animations. Child of the Animation class.
 */
class ComboAnimation extends Animation{
    /**
     * ComboAnimation constructor
     *
     * @constructor
     * @this {ComboAnimation}
     * @param {CGFScene} scene Scene where ComboAnimation is being created in.
     * @param {string} id ComboAnimation ID.
     * @param {string} type ComboAnimation type.
     * @param {Array} animationRefs Array of existing animations contained in the ComboAnimation.
     */
    constructor(scene, id, type, animationRefs){
        super(scene, id, type);
        this.animationRefs = animationRefs;

        //constains all the animationRefs times (acumulative)
        this.animationTimes = [];
        this.currAnimation = 0;
        this.animationMatrix = mat4.create();
        this.sectionsPassed = 0;

        //pushes all sections of all animationRefs into the sectionTimes array (used to break down linear animations with multiple subanimations)
        var timeAux = 0;
        for(var i = 0; i < this.animationRefs.length; i++){
            for(var j = 0; j < this.scene.graph.animations[this.animationRefs[i]].sectionTimes.length - 1; j++){
                if(this.scene.graph.animations[this.animationRefs[i]].sectionTimes.length > 1){
                    this.sectionTimes.push(timeAux + this.scene.graph.animations[this.animationRefs[i]].sectionTimes[j]);
                }
            }
            var teste = this.scene.graph.animations[this.animationRefs[i]].sectionTimes[this.scene.graph.animations[this.animationRefs[i]].sectionTimes.length - 1];
            timeAux += teste;
            this.sectionTimes.push(timeAux);
        }

        var animationAux = 0;
        for(var i = 0; i < this.animationRefs.length; i++){
            animationAux += this.scene.graph.animations[animationRefs[i]].getAnimationSpan();
            this.animationTimes.push(animationAux);
        }

        this.animationSpan = this.animationTimes[this.animationTimes.length - 1];
    }

    /**
     * Gets the ComboAnimation's animation matrix
     * 
     * @this {ComboAnimation}
     * @param {number} time Current time of the ComboAnimation.
     * @param {number} section Current section of the ComboAnimation.
     * @return {matrix} Returns the current ComboAnimation animation matrix, at the given time and section.
     */
    getAnimationMatrix(time, section){
        var sectionTime = time;

        if(this.currAnimation >= 1){
            sectionTime -= this.animationTimes[this.currAnimation - 1];
            if(sectionTime < (this.animationTimes[this.currAnimation] - this.animationTimes[this.currAnimation-1])){
                this.animationMatrix = this.scene.graph.animations[this.animationRefs[this.currAnimation]].getAnimationMatrix(sectionTime, this.sectionsPassed);
            }   
            else{
                this.sectionsPassed -= this.scene.graph.animations[this.animationRefs[this.currAnimation]].sectionTimes.length;
                this.currAnimation++;
            }

            if(this.currAnimation > this.animationRefs.length - 1){
                this.finished = true;
            }
        }
        else if(this.currAnimation == 0){
            if(sectionTime < this.animationTimes[this.currAnimation]){
                this.animationMatrix = this.scene.graph.animations[this.animationRefs[this.currAnimation]].getAnimationMatrix(sectionTime, this.sectionsPassed);
            }   
            else{
                this.sectionsPassed -= this.scene.graph.animations[this.animationRefs[this.currAnimation]].sectionTimes.length;
                this.currAnimation++;
            }
        }

        return this.animationMatrix;
    }
}