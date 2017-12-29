class Board{
	constructor(scene, x, y){
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.distanceBetweenTiles = 0.685;
		this.boardMatrix = [];

		this.currentTileID = 0;
		this.selectable = false;

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
				if(this.boardMatrix[i][j].placedPiece != null){
					this.boardMatrix[i][j].placedPiece.tile = null;
				}
				this.boardMatrix[i][j].placedPiece = null;
				this.boardMatrix[i][j].selected = false;
				this.boardMatrix[i][j].highlighed = false;
				this.boardMatrix[i][j].occupied = false;
			}
		}
	}

	makeSelectable(){
		this.selectable = true;
	}

	makeUnselectable(){
		this.selectable = false;
	}

	display(){
		for(var i = 0; i < this.boardMatrix.length; i++){
			for(var j = 0; j < this.boardMatrix[i].length; j++){
				this.scene.pushMatrix();
				this.scene.translate(this.distanceBetweenTiles*(-2) + j * this.distanceBetweenTiles, 0, this.distanceBetweenTiles*(-2) + i * this.distanceBetweenTiles);
				if(this.selectable && (this.boardMatrix[i][j].placedPiece == null)){
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
	}
}