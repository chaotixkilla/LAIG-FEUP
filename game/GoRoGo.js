class GoRoGo{
	constructor(scene){
		this.scene = scene;

		this.mainBoard = new Board(scene, 5, 5);
		this.player1Graveyard = new AuxiliaryBoard(scene, 1);
		this.player1AuxBoard = new AuxiliaryBoard(scene, 2);
		this.player2Graveyard = new AuxiliaryBoard(scene, 3);
		this.player2AuxBoard = new AuxiliaryBoard(scene, 4);

		this.firstPiece = new Piece(this.scene, 3, 24);

		this.boards = [this.mainBoard, this.player1Graveyard, this.player1AuxBoard, this.player2Graveyard, this.player2AuxBoard];

		this.player1Pieces = [];
		this.player1Score = 0;
		this.player2Pieces = [];
		this.player2Score = 0;

		this.allPieces = [];

		this.states = ['Waiting for a game to start', 'First play (the henge piece left)', 'Game being played', 'Game finished', 'Replaying a game'];
		this.playPieceStates = ['Piece picked up', 'Piece waiting to be placed'];

		this.currentState = 0;
		this.currentPlayState = -1;
		this.currentPlayer = -1;
		this.currentPickableBoard = null;

		this.playTime = 0;
		this.timeoutTime = 10;
		this.timeout = false;
		this.gameMode = 0;

		this.addPiecesToPlayers();
		this.placeInitialPieces();
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

		this.allPieces.push(this.firstPiece);
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

	unbindPieceToTile(tile, piece){
 		tile.placedPiece = null;
 		tile.occupied = false;
 		piece.tile = null;
 	}
 
 	makeSelectable(board){
 		for(var i = 0; i < this.boards.length; i++){
 			if(this.boards[i] == board){
 				board.makeSelectable();
 			}
 			else{
 				this.boards[i].makeUnselectable();
 			}
 		}
 		this.currentPickableBoard = board;
 	}

 	checkPieceOwner(piece){
 		if(piece.id > 11){
 			return 1;
 		}
 		return 0;
 	}

 	makePlay(tile, piece){
 		if(!tile.occupied){
 			this.bindPieceToTile(tile, piece);
 		}
 		return;
 	}

 	pickTile(index){
  		var pickedTileID = index-1;
		for(var i = 0; i < this.currentPickableBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.currentPickableBoard.boardMatrix[i].length; j++){
				if(this.currentPickableBoard.boardMatrix[i][j].id == pickedTileID){
					var pickedTile = this.currentPickableBoard.boardMatrix[i][j];
 				}
 			}
  		}

  		if(this.currentState == 1){
  			pickedTile.selected = true;
  			this.removeHighlights();
  			this.currentState++;
  			this.bindPieceToTile(pickedTile, this.allPieces[24]);
  			this.currentPlayer++;
  			this.currentPlayState = 0;
  		}

  		if(this.currentState == 2){
  			if(this.currentPlayState == 0){
  				if(this.currentPlayer % 2 == 0){
  					console.log("Player 1 playing");
  					this.makeSelectable(this.player1AuxBoard);
  					pickedTile.selected = true;
  					this.currentPlayer++;
  					this.currentPlayState++;
  				}
  				else{
  					console.log("Player 2 playing");
  					this.makeSelectable(this.player2AuxBoard);
  					pickedTile.selected = true;
  					this.currentPlayer++;
  					this.currentPlayState++;
  				}
  			}
  			else if(this.currentPlayState == 1){
  				console.log("Place the selected piece on the board");
  				this.makeSelectable(this.mainBoard);
  				pickedTile.selected = true;
  				this.currentPlayState--;
  			}
  		}

  		console.log(pickedTile);
  	}

  	highlightPossibleMoves(){
  		for(var i = 0; i < this.mainBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.mainBoard.boardMatrix[i].length; j++){
				this.mainBoard.boardMatrix[i][j].highlighed = true;
 			}
  		}
  	}

  	removeHighlights(){
  		for(var i = 0; i < this.mainBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.mainBoard.boardMatrix[i].length; j++){
				if(this.mainBoard.boardMatrix[i][j].highlighed){
					this.mainBoard.boardMatrix[i][j].highlighed = false;
				}
 			}
  		}
  	}

  	firstTurn(){
  		this.highlightPossibleMoves();
 		this.makeSelectable(this.mainBoard);
 		this.currentState = 1;
 		this.currentPlayer = 0;
  	}

 	startGame(){
		/*
		alert("getPrologRequest test call, brace yourselves");
		this.getPrologRequest("getInitialBoard", null, null, 8081);
		alert("k done proceed");
		*/
 		this.placeInitialPieces();
 		this.firstTurn();

	}

	display(){
		this.mainBoard.display();
		this.player1Graveyard.display();
		this.player1AuxBoard.display();
		this.player2Graveyard.display();
		this.player2AuxBoard.display();
	}


	addGameGUI(){
		var gameInterface = this.scene.interface;
		gameInterface.game = gameInterface.gui.addFolder('Game');
		gameInterface.game.open();

		//Start Game button
		var btn = {'Start Game':this.startGame.bind(this) };
		gameInterface.game.startBtn = gameInterface.game.add(btn, 'Start Game');

		//Game Mode dropdown
		var dropdown = gameInterface.game.add(this, 'gameMode',
		{'Player X Player' : 0,
		 'Player X CPU'	   : 1,
		 'CPU X CPU'	   : 2
		 }).name('Game Mode');
		dropdown.__select.selectedIndex = this.gameMode;

		//Play Timeout checkbox, Timeout Duration slider
		var timeoutBtn = gameInterface.game.add(this, 'timeout').name('Play Timeout');
		timeoutBtn.onFinishChange(function(){
			if(this.timeout)
				this.playTime = this.timeoutTime;
			else
		
				this.playTime = 0;
		}.bind(this));
		gameInterface.game.add(this, 'timeoutTime').min(10).max(60).step(5).name('Timeout Duration');

		//Undo button
		var ndbtn = {'Undo':function(){
			this.undo();
		}.bind(this)};
		var undoBtn = gameInterface.game.add(ndbtn, 'Undo');


	}

	undo(){
		alert('Play Undoer Simulator');
	}

	getPrologRequest(requestString, onSuccess, onError, port){
		
	  var requestPort = port || 8081;
	  var request = new XMLHttpRequest();
	  request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

	  request.onload = onSuccess || function(data){
		var response = data.target.response;

		//ask for initial board
		if(requestString == "getInitialBoard"){
		  this.mainBoard = response;
		}
	  }

	  request.onerror = onError || function(){console.log("Error waiting for response");};

	  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	  request.send();
	}








}