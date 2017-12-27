class Tile{
	constructor(scene, id, xCoord, yCoord){
		this.scene = scene;
		this.id = id;
		this.x = xCoord;
		this.y = yCoord;
		this.z = 0.39;

		this.occupied = false;
		this.placedPiece = null;

		this.isOnMainBoard = false;
		this.selected = false;
		this.highlighed = false;

		this.material = new CGFappearance(this.scene);
 	    this.material.setShininess(1);
    	this.material.setSpecular(0, 0, 0, 1);
	    this.material.setDiffuse(0.5, 0.5, 0.5, 1);
    	this.material.setAmbient(0, 0, 0, 1);
   		this.material.setEmission(0, 0, 0, 1);

   		this.redMaterial = new CGFappearance(this.scene);
  		this.redMaterial.setDiffuse(0.7,0,0,1);
  		this.redMaterial.setSpecular(0.7,0,0,1);
    	this.redMaterial.setAmbient(0.7,0.1,0.1,1);

   		this.material.loadTexture("./scenes/images/black_rock.jpg");

		this.tile = new MyCylinder(this.scene, "0.01 0.08 0.08 20 20 1 1");
	}

	display(){
		this.scene.pushMatrix();
			this.scene.translate(0, this.z, 0);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			if(this.selected){
				this.redMaterial.apply();
			}
			else{
				this.material.apply();
			}
			this.tile.display();
		this.scene.popMatrix();
	}
}