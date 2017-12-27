class AuxiliaryBoard extends Board{
	constructor(scene, player){
		//4 auxiliary boards (1 -> player1 graveyard, 2->player1, 3->player2 graveyard, 4->player2)
		super(scene, 2, 6);
		this.player = player;

		this.auxTileID = this.currentTileID;

		/*this.woodMaterial = new CGFappearance(this.scene);
 	    this.woodMaterial.setShininess(1);
    	this.woodMaterial.setSpecular(0, 0, 0, 1);
	    this.woodMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
    	this.woodMaterial.setAmbient(0, 0, 0, 1);
   		this.woodMaterial.setEmission(0, 0, 0, 1);
   		this.woodMaterial.loadTexture("./scenes/images/light_wood.jpg");*/
	}

	display(){
		this.scene.pushMatrix();
		this.scene.rotate(this.player * Math.PI/2, 0, 1, 0);
		this.scene.translate(0.25, 0, -1.3);

		for(var i = 0; i < this.boardMatrix.length; i++){
			for(var j = 0; j < this.boardMatrix[i].length; j++){
				this.scene.pushMatrix();
				this.scene.translate(this.distanceBetweenTiles*(-2) + j * (this.distanceBetweenTiles/1.5), 0, this.distanceBetweenTiles*(-2) + i * (this.distanceBetweenTiles/1.5));
				this.boardMatrix[i][j].woodMaterial.apply();
				if(this.player % 2 == 0){
					this.scene.registerForPick(this.boardMatrix[i].length * i + j + 1, this.boardMatrix[i][j]);
				}
				else{
					this.scene.clearPickRegistration();
				}
				this.boardMatrix[i][j].display();
				this.scene.popMatrix();
			}
		}

		this.scene.popMatrix();
	}
}