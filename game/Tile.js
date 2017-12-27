class Tile{
	constructor(scene, id, xCoord, yCoord){
		this.scene = scene;
		this.id = id;
		this.x = xCoord;
		this.y = yCoord;
		this.z = 2.9;

		this.occupied = false;
		this.placedPiece = null;

		this.isOnMainBoard = false;

		this.material = new CGFappearance(this.scene);
 	    this.material.setShininess(1);
    	this.material.setSpecular(0, 0, 0, 1);
	    this.material.setDiffuse(0.5, 0.5, 0.5, 1);
    	this.material.setAmbient(0, 0, 0, 1);
   		this.material.setEmission(0, 0, 0, 1);

		this.tile = new MyCylinder(this.scene, "0.01 0.08 0.08 20 20 1 1");
	}

	checkIfPieceWasPlaced(){
		if(this.placedPiece != null){
			this.occupied = true;
		}
	}

	display(){
		this.scene.pushMatrix();
			this.tile.display();
		this.scene.popMatrix();
	}
}