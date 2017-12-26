/**
 * Creates an instance of MyCylinder, which creates instances of the cylinder's body and top and bottom caps.
 * 
 * @constructor
 * @this {MyCylinder}
 * @param {CGFScene} scene Scene to place this object in.
 * @param {Array} args Array containing the information needed to draw a MyCylinder. 
 */
 function MyCylinder(scene, args) {
 	CGFobject.call(this,scene);
	
	args = args.split(" ");

	this.height = parseFloat(args[0]);
	this.botRad = parseFloat(args[1]);
	this.topRad = parseFloat(args[2]);
	this.stacks = parseFloat(args[3]);
	this.slices = parseFloat(args[4]);
	this.topCap = parseFloat(args[5]);
	this.botCap = parseFloat(args[6]);
	this.heightInc = this.height/this.stacks;

	this.cylinder = new MyCylinderAux(this.scene, this.height, this.botRad, this.topRad, this.stacks, this.slices);
	this.top = new MyCircle(this.scene, this.slices);
	this.bot = new MyCircle(this.scene, this.slices);

 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 /**
 * Displays the pretended MyCylinder, drawing a top and/or bottom cap if wanted.
 *
 * @this {MyCylinder}
 */
 MyCylinder.prototype.display = function() {
 	
 	this.scene.pushMatrix();
		this.cylinder.display();
 	this.scene.popMatrix();


	if(this.topCap == 1){
		this.scene.pushMatrix();
 		this.scene.translate(0, 0, this.height);
 		this.scene.scale(this.topRad, this.topRad, 1);
		this.top.display();
 		this.scene.popMatrix();
	}

	if(this.botCap == 1){
		this.scene.pushMatrix();
 		this.scene.rotate(Math.PI, 0, 1, 0);
 		this.scene.scale(this.botRad, this.botRad, 1);
		this.bot.display();
 		this.scene.popMatrix();
	}


 };

 /**
* Scales the texture bound on MyCylinder. Overrides the same function in MyGraphLeaf.
*
* @this {MyCylinder}
* @param {number} ampS Amplification factor on the S coordinate in the ST coordinate system.
* @param {number} ampT Amplification factor on the T coordinate in the ST coordinate system.
*/
 MyCylinder.prototype.scaleTex = function(ampS, ampT){
	
}