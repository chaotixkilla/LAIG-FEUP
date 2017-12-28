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

		this.states = ['Waiting for a game to start', 'Game being played', 'Game finished', 'Replaying sa game'];
		this.playPieceStates = ['Piece picked up', 'Piece waiting to be placed'];

		this.currentState = 1;
		this.currentPlayState = -1;
		this.currentPlayer = 0;
		this.currentPickableBoard = null;

		this.addPiecesToPlayers();
		this.placeInitialPieces();
		this.startGame();
	}

	addPiecesToPlayers(){
		for(var i = 0; i < 10; i++){
			this.player1Pieces.push(new Piece(this.scene, 1, i));
			this.allPieces.push(this.player1Pieces[i]);
		}
		this.player1Pieces.push(new Piece(this.scene, 3, i), new Piece(this.scene, 3, i+1));
		this.allPieces.push(this.player1Pieces[10], this.player1Pieces[11]);

		for(var j = 0; j < 10; j++){
			this.player2Pieces.push(new Piece(this.scene, 2, i+j+3));
			this.allPieces.push(this.player2Pieces[j]);
		}
		this.player2Pieces.push(new Piece(this.scene, 3, i+j+3), new Piece(this.scene, 3, i+j+4));
		this.allPieces.push(this.player2Pieces[10], this.player2Pieces[11]);
	}

	clearEntireBoard(){
		this.mainBoard.clearTiles();
		this.player1Graveyard.clearTiles();
		this.player1AuxBoard.clearTiles();
		this.player2Graveyard.clearTiles();
		this.player2AuxBoard.clearTiles();
	}

	placeInitialPieces(){
		this.clearEntireBoard();

		for(var i = 0; i < this.player1AuxBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.player1AuxBoard.boardMatrix[i].length; j++){
				this.bindPieceToTile(this.player1AuxBoard.boardMatrix[i][j], this.allPieces[this.player1AuxBoard.boardMatrix[i].length * i + j]);
			}
		}

        for(var i = 0; i < this.player2AuxBoard.boardMatrix.length; i++){
            for(var j = 0; j < this.player2AuxBoard.boardMatrix[i].length; j++){
                this.bindPieceToTile(this.player2AuxBoard.boardMatrix[i][j], this.allPieces[12 + this.player2AuxBoard.boardMatrix[i].length * i + j]);
            }
        }
	}

	bindPieceToTile(tile, piece){
		tile.placedPiece = piece;
		tile.occupied = true;
		piece.tile = tile;
	}

	startGame(){
		this.mainBoard.makeSelectable();
		//this.player1AuxBoard.makeSelectable();
		this.currentPlayState = 0;
		this.currentPickableBoard = this.mainBoard;
	}

	pickTile(index){
		var pickedTileID = index-1;
		if(this.currentPlayState == 0){
			for(var i = 0; i < this.currentPickableBoard.boardMatrix.length; i++){
				for(var j = 0; j < this.currentPickableBoard.boardMatrix[i].length; j++){
					if(this.currentPickableBoard.boardMatrix[i][j].id == pickedTileID){
						console.log('TILE SELECCIONADA: X =' + (i+1) + ' Y = ' + (j+1));
					}
				}
			}
		}
	}

	display(){
		this.mainBoard.display();
		this.player1Graveyard.display();
		this.player1AuxBoard.display();
		this.player2Graveyard.display();
		this.player2AuxBoard.display();
	}
}