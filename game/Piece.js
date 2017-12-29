class Piece{
	constructor(scene, type, id){
		this.scene = scene;
		this.type = type;
		this.id = id;

		this.tile = null;
		this.moving = false;

		//this.piece = new MyCylinder(this.scene, "0.15 0.20 0.20 20 20 1 1");
		this.piece = new MySphere(this.scene, "0.20 20 20");

		this.blackMaterial = new CGFappearance(this.scene);
 	    this.blackMaterial.setShininess(1);
    	this.blackMaterial.setSpecular(0, 0, 0, 1);
	    this.blackMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
    	this.blackMaterial.setAmbient(0, 0, 0, 1);
   		this.blackMaterial.setEmission(0, 0, 0, 1);
   		this.blackMaterial.loadTexture("./scenes/images/black_rock.jpg");

   		this.whiteMaterial = new CGFappearance(this.scene);
 	    this.whiteMaterial.setShininess(1);
    	this.whiteMaterial.setSpecular(0, 0, 0, 1);
	    this.whiteMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
    	this.whiteMaterial.setAmbient(0, 0, 0, 1);
   		this.whiteMaterial.setEmission(0, 0, 0, 1);
   		this.whiteMaterial.loadTexture("./scenes/images/white_rock.jpg");

   		this.hengeMaterial = new CGFappearance(this.scene);
 	    this.hengeMaterial.setShininess(1);
    	this.hengeMaterial.setSpecular(0, 0, 0, 1);
	    this.hengeMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
    	this.hengeMaterial.setAmbient(0, 0, 0, 1);
   		this.hengeMaterial.setEmission(0, 0, 0, 1);
   		this.hengeMaterial.loadTexture("./scenes/images/grey_rock.jpg");

   		this.redMaterial = new CGFappearance(this.scene);
 		this.redMaterial.setDiffuse(0.7,0,0,1);
 		this.redMaterial.setSpecular(0.7,0,0,1);
 		this.redMaterial.setAmbient(0.7,0.1,0.1,1);

   		this.materials = [this.whiteMaterial, this.blackMaterial, this.hengeMaterial];
   		this.allTypes = ['white', 'black', 'henge'];
	}

	display(){
		this.scene.pushMatrix();
			this.scene.translate(0, 0.47, 0);
			this.scene.scale(0.8, 0.4, 0.8);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			if(this.tile.selected){
				this.redMaterial.apply();
			}
			else{
				this.materials[this.type-1].apply();
			}
			this.piece.display();
		this.scene.popMatrix();
	}
}