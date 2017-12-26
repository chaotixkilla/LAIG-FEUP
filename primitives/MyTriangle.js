//args="2 0 12 12 0 2 0 0 0" />

/**
 * Creates an instance of MyTriangle
 * 
 * @constructor
 * @this {MyTriangle}
 * @param {CGFScene} scene Scene to place this object in.
 * @param {Array} args Array containing the information needed to draw a MyTriangle.  
 */
function MyTriangle(scene, args) {
	CGFobject.call(this,scene);

	this.args = args.split(" ");
	for(var i = 0; i < this.args.length; i++){
		this.args[i] = parseFloat(this.args[i]);
	}


	this.args = args;
	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

/**
 * Initializes the MyTriangle buffers.
 *
 * @this {MyTriangle}
 */
MyTriangle.prototype.initBuffers = function () {

	var coords = this.args.split(" ");
	this.a = Math.sqrt(Math.pow(coords[0] - coords[6], 2) + Math.pow(coords[1] - coords[7], 2) + Math.pow(coords[2] - coords[8], 2));
	this.b = Math.sqrt(Math.pow(coords[3] - coords[0], 2) + Math.pow(coords[4] - coords[1], 2) + Math.pow(coords[5] - coords[2], 2));
	this.c = Math.sqrt(Math.pow(coords[6] - coords[3], 2) + Math.pow(coords[7] - coords[4], 2) + Math.pow(coords[8] - coords[5], 2));
	
	this.cos_a = Math.cos((- Math.pow(this.a, 2) + Math.pow(this.b, 2) + Math.pow(this.c, 2))/(2 * this.b * this.c));
	this.cos_b = Math.cos((Math.pow(this.a, 2) - Math.pow(this.b, 2) + Math.pow(this.c, 2))/(2 * this.b * this.c));
	this.cos_c = Math.cos((Math.pow(this.a, 2) + Math.pow(this.b, 2) - Math.pow(this.c, 2))/(2 * this.b * this.c));
	this.sin_b = Math.sqrt(1 - Math.pow(this.cos_b, 2));

	this.vertices = [
            coords[0], coords[1], coords[2],
            coords[3], coords[4], coords[5],
            coords[6], coords[7], coords[8],
			];

	this.indices = [
            0, 1, 2
        ];

    this.normals = [
    		0, 1, 0,
    		0, 1, 0,
    		0, 1, 0
    	];


	this.texCoords = [
			0, 0,
			0, 1,
			1, 1
		];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

/**
* Scales the texture bound on MyTriangle. Overrides the same function in MyGraphLeaf.
*
* @this {MyTriangle}
* @param {number} ampS Amplification factor on the S coordinate in the ST coordinate system.
* @param {number} ampT Amplification factor on the T coordinate in the ST coordinate system.
*/
MyTriangle.prototype.scaleTex = function(ampS, ampT){
	this.texCoords = [
			/*(this.c - this.a * this.cos_b)/ampS, (1 - this.a * this.sin_b)/ampT,
			0, 1,
			this.c/ampS, 1*/
			0, 1,
			this.c/ampS, 1,
			(this.c - this.a * this.cos_b)/ampS, (1 - this.a * this.sin_b)/(ampT)
		];
	this.updateTexCoordsGLBuffers();
}