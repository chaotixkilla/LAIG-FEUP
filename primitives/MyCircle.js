/**
 * Creates an instance of MyCircle
 * 
 * @constructor
 * @this {MyCircle}
 * @param {CGFScene} scene Scene to place this object in.
 * @param {number} slices Slices to divide the circle in for more precise drawing. 
 */
 function MyCircle(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 /**
 * Initializes the MyCircle buffers.
 *
 * @this {MyCircle}
 */
 MyCircle.prototype.initBuffers = function() {
	var angulo = 2*Math.PI/this.slices;
	var currRad = this.botRad;
	var radiusInc = (this.topRad - this.botRad)/this.stacks;

 	this.vertices = [
 	
 	];

 	this.indices = [

 	];

 	this.normals = [

 	];

 	this.texCoords = [

 	];


 	for (i = 0; i < this.slices; i++){
 	    this.vertices.push(Math.cos(i*angulo), Math.sin(i*angulo), 0);
 	    this.normals.push(0,0,1);
 	    this.texCoords.push((-Math.cos(i*angulo)+1)/2,(Math.sin(i*angulo)+1)/2);
 	}

 	for (j = 0; j < this.slices-2; j++){
		this.indices.push(0,j+1,j+2);
	}

	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

/**
* Scales the texture bound on MyCircle. Overrides the same function in MyGraphLeaf.
*
* @this {MyCircle}
* @param {number} ampS Amplification factor on the S coordinate in the ST coordinate system.
* @param {number} ampT Amplification factor on the T coordinate in the ST coordinate system.
*/
MyCircle.prototype.scaleTex = function(ampS, ampT){
	
}