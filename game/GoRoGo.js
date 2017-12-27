class GoRoGo{
	constructor(scene){
		this.scene = scene;

		this.mainBoard = new Board(scene, 5, 5);
		this.player1Graveyard = new AuxiliaryBoard(scene, 1);
		this.player1AuxBoard = new AuxiliaryBoard(scene, 2);
		this.player2Graveyard = new AuxiliaryBoard(scene, 3);
		this.player2AuxBoard = new AuxiliaryBoard(scene, 4);

		this.player1Pieces = [];
		this.player1Score = 0;
		this.player2Pieces = [];
		this.player2Score = 0;

		this.allPieces = [];

		this.currentTileID = 0;

		this.addPiecesToPlayers();
		this.placeInitialPieces();
	}

	addPiecesToPlayers(){
		for(var i = 0; i < 10; i++){
			this.player1Pieces.push(new Piece(this.scene, 1, i));
			this.allPieces.push(this.player1Pieces[i]);
		}
		this.player1Pieces.push(new Piece(this.scene, 3, i), new Piece(this.scene, 3, i+1));
		this.allPieces.push(new Piece(this.scene, 3, i), new Piece(this.scene, 3, i+1));

		for(var j = 0; j < 10; j++){
			this.player2Pieces.push(new Piece(this.scene, 2, i+j+3));
			this.allPieces.push(this.player2Pieces[j]);
		}
		this.player2Pieces.push(new Piece(this.scene, 3, i+j+3), new Piece(this.scene, 3, i+j+4));
		this.allPieces.push(new Piece(this.scene, 3, i+j+3), new Piece(this.scene, 3, i+j+4));
	}

	placeInitialPieces(){
		this.mainBoard.clearTiles();

		console.log('SIZE = ' + this.player1AuxBoard.length);

		for(var i = 0; i < this.player1AuxBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.player1AuxBoard.boardMatrix[i].length; j++){
				this.bindPieceToTile(this.player1AuxBoard.boardMatrix[i][j], this.allPieces[i*j]);
			}
		}
	}

	bindPieceToTile(tile, piece){
		tile.placedPiece = piece;
		tile.occupied = true;
		piece.tile = tile;
	}

	display(){
		this.mainBoard.display();
		this.player1Graveyard.display();
		this.player1AuxBoard.display();
		this.player2Graveyard.display();
		this.player2AuxBoard.display();
	}
}