class AuxiliaryBoard extends Board{
	constructor(scene, player){
		//4 auxiliary boards (1 -> player1 graveyard, 2->player1, 3->player2 graveyard, 4->player2)
		super(scene, 2, 6);
		this.player = player;

		this.auxTileID = this.currentTileID;
	}

	display(){
		this.scene.pushMatrix();
		this.scene.rotate(this.player * Math.PI/2, 0, 1, 0);
		this.scene.translate(0.25, 0, -1.3);

		for(var i = 0; i < this.boardMatrix.length; i++){
			for(var j = 0; j < this.boardMatrix[i].length; j++){
				this.scene.pushMatrix();
				this.scene.translate(this.distanceBetweenTiles*(-2) + j * (this.distanceBetweenTiles/1.5), 0, this.distanceBetweenTiles*(-2) + i * (this.distanceBetweenTiles/1.5));
				if(this.player % 2 == 0 && this.selectable){
					this.scene.registerForPick(this.boardMatrix[i].length * i + j + 1, this.boardMatrix[i][j]);
				}
				else{
					this.scene.clearPickRegistration();
				}
				this.boardMatrix[i][j].display();
				if(this.boardMatrix[i][j].occupied){
					this.boardMatrix[i][j].placedPiece.display();
				}
				this.scene.popMatrix();
			}
		}

		this.scene.popMatrix();
	}
}