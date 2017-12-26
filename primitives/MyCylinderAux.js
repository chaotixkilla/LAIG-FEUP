/**
 * Creates an instance of MyCylinderAux, which creates the body of a cylinder.
 * 
 * @constructor
 * @this {MyCylinderAux}
 * @param {CGFScene} scene Scene to place this object in.
 * @param {number} height Cylinder's height value. 
 * @param {number} botRad Cylinder's bottom radius value. 
 * @param {number} topRad Cylinder's top radius value. 
 * @param {number} stacks Number of stacks to divide the cylinder into. 
 * @param {number} slices Number of slices to divide the cylinder into. 
 */
 function MyCylinderAux(scene, height, botRad, topRad, stacks, slices) {
 	CGFobject.call(this,scene);

 	this.height = height;
 	this.botRad = botRad;
 	this.topRad = topRad;
 	this.stacks = stacks;
 	this.slices = slices;

	this.heightInc = this.height/this.stacks;

 	this.initBuffers();
 };

 MyCylinderAux.prototype = Object.create(CGFobject.prototype);
 MyCylinderAux.prototype.constructor = MyCylinderAux;

 /**
 * Initializes the MyCylinderAux buffers.
 *
 * @this {MyCylinderAux}
 */
 MyCylinderAux.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

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


 	//tampa 1
 	/*for(i = 0; i < this.slices; i++){
 
    this.vertices.push(
    this.topRad * Math.sin(i * Math.PI*2/this.slices),
    this.topRad * Math.cos(i * Math.PI*2/this.slices),
    1);
 
    this.normals.push(0,0,1);
	}*/

	

	for(j = 0; j <= this.stacks; j++){
		for(i = 0; i <= this.slices; i++){

		//vértices
		//como o prisma é unitário, a altura de cada stack é de 1/stacks.
		//
		//cada ciclo faz dois pontos (o actual e o seu consecutivo). assim no final do for, cada 
		//vértice está duas vezes no vector (para as normais).
		this.vertices.push(currRad * Math.cos(i*angulo), currRad * Math.sin(i*angulo), j * this.heightInc);

		//normais
		this.normals.push(currRad * Math.cos(angulo/2 + i*angulo), currRad * Math.sin(angulo/2 + i*angulo), 0);

		this.texCoords.push(i / this.slices, j / this.stacks);
		}
		currRad += radiusInc;
	}


	for(j = 0; j < this.stacks + 1; j++){
		for(i = 0; i < this.slices; i++){
			//indices
			//regra da mão direita e cada vértice é assinalado duas vezes
			//0, 1, 13
			//13, 12, 0
			//é o caso base
			//this.indices.push(j*this.slices+i,j*this.slices+i+1,(j+1)*this.slices+i+1);
			//this.indices.push((j+1)*this.slices+i+1,(j+1)*this.slices+i,j*this.slices+i);

			this.indices.push(j*this.slices+i,j*this.slices+((i+1)%this.slices),(j+1)*this.slices+(i+1)%this.slices);
			this.indices.push(j*this.slices+i,(j+1)*this.slices+((i+1)%this.slices),(j+1)*this.slices+i);
		}
	}

	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

/**
* Scales the texture bound on MyCylinderAux. Overrides the same function in MyGraphLeaf.
*
* @this {MyCylinderAux}
* @param {number} ampS Amplification factor on the S coordinate in the ST coordinate system.
* @param {number} ampT Amplification factor on the T coordinate in the ST coordinate system.
*/
MyCylinderAux.prototype.scaleTex = function(ampS, ampT){
	
}