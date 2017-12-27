class Board{
	constructor(scene, x, y){
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.distanceBetweenTiles = 0.685;
		this.boardMatrix = [];

		this.currentTileID = 0;

		for(var i = 0; i < this.x; i++){
			this.boardMatrix.push([]);
			for(var j = 0; j < this.y; j++){
				this.boardMatrix[i].push(new Tile(this.scene, this.currentTileID, i+1, j+1));
				this.currentTileID++;
			}
		}
	}

	clearTiles(){
		for(var i = 0; i < this.x; i++){
			for(var j = 0; j < this.y; j++){
				this.boardMatrix[i][j].placedPiece = null;
			}
		}
	}

	display(){
		for(var i = 0; i < this.boardMatrix.length; i++){
			for(var j = 0; j < this.boardMatrix[i].length; j++){
				this.scene.pushMatrix();
				this.scene.translate(this.distanceBetweenTiles*(-2) + j * this.distanceBetweenTiles, 0, this.distanceBetweenTiles*(-2) + i * this.distanceBetweenTiles);
				if(true){
					this.scene.registerForPick(this.boardMatrix.length * i + j + 1, this.boardMatrix[i][j]);
				}
				this.boardMatrix[i][j].display();
				this.scene.popMatrix();
			}
		}
	}
}