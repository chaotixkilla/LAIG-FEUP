/**
* MyGraphNode class, representing an intermediate node in the scene graph.
* 
* @constructor
* @this {MyGraphNode}
* @param {MySceneGraph} graph Graph where the nodes info is being read from.
* @param {string} nodeID ID of the node being created.
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;
    
    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    // The animation ID.
    this.animationsID = [];

    // The animation Index
    this.animationIndex = 0;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);

    // Animation Matrix
    this.animationMatrix = mat4.create();
    mat4.identity(this.animationMatrix);

    // Animation Time
    this.animationTime = 0;
    this.animationSection = 0;
    this.animationIndex = 0;

    // Selectable for shaders (default is false)
    this.selectable = false;

    this.pickable = false;
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 *
 * @this {MyGraphNode}
 * @param {string} nodeID ID of the node which a child is being added.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 *
 * @this {MyGraphNode}
 * @param {string} nodeID ID of the node which a leaf is being added.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}

/**
 * Updates the animation present in this node.
 * @this {MyGraphNode}
 * @param {number} deltaTime Time elapsed since the last animation update.
 */
MyGraphNode.prototype.updateAnimation = function(deltaTime){
    this.animationTime += deltaTime;
    if(this.animationIndex < this.animationsID.length){
        //gets animation being processed
        var currAnimation = this.graph.animations[this.animationsID[this.animationIndex]];

        //gets currAnimation matrix
        this.animationMatrix = currAnimation.getAnimationMatrix(this.animationTime, this.animationSection);
        
        
        //finished processing current animation 
        if(this.animationTime >= currAnimation.getAnimationSpan()){
           this.animationSection = 0;
           this.animationTime = 0;
           this.animationIndex++; 
        }

        //moving to next section of the current animation (useful for animation with multiple sections, such as linear and combo animations)
        else if(this.animationTime >= currAnimation.sectionTimes[this.animationSection]){
            if(currAnimation.type == "combo"){
                currAnimation.sectionsPassed++;
            }
            this.animationSection++;
        }
    }
}


