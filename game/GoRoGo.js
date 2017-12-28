class GoRoGo{
	constructor(scene){
		this.scene = scene;

		this.mainBoard = new Board(scene, 5, 5);
		this.player1Graveyard = new AuxiliaryBoard(scene, 1);
		this.player1AuxBoard = new AuxiliaryBoard(scene, 2);
		this.player2Graveyard = new AuxiliaryBoard(scene, 3);
		this.player2AuxBoard = new AuxiliaryBoard(scene, 4);

		this.boards = [this.mainBoard, this.player1Graveyard, this.player1AuxBoard, this.player2Graveyard, this.player2AuxBoard];

		this.player1Pieces = [];
		this.player1Score = 0;
		this.player2Pieces = [];
		this.player2Score = 0;

		this.allPieces = [];

		this.currentTileID = 0;

		this.addPiecesToPlayers();
		this.placeInitialPieces();

		this.playTime = 0;
		this.timeoutTime = 10;
		this.timeout = false;
		this.gameMode = 0;

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

		for(var i = 0; i < this.player1AuxBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.player1AuxBoard.boardMatrix[i].length; j++){
				this.bindPieceToTile(this.player1AuxBoard.boardMatrix[i][j], this.allPieces[this.player1AuxBoard.boardMatrix[i].length * i + j]);
			}
		}

        for(var i = 0; i < this.player2AuxBoard.boardMatrix.length; i++){
            for(var j = 0; j < this.player2AuxBoard.boardMatrix[i].length; j++){
                this.bindPieceToTile(this.player2AuxBoard.boardMatrix[i][j], this.allPieces[12 + this.player2AuxBoard.boardMatrix[i].length * i + j]);
                console.log(this.allPieces[12 + this.player2AuxBoard.boardMatrix[i].length * i + j]);
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

 	pickTile(index){
  		var pickedTileID = index-1;
		for(var i = 0; i < this.currentPickableBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.currentPickableBoard.boardMatrix[i].length; j++){
				if(this.currentPickableBoard.boardMatrix[i][j].id == pickedTileID){
					var currentTile = this.currentPickableBoard.boardMatrix[i][j];
 				}
 			}
  		}
 		if(this.currentPlayState == 0){
 			currentTile.selected = true;
 			this.currentPlayState++;
 		}
 		else if(this.currentPlayState == 1){
 			this.makeSelectable(this.mainBoard);
 		}
  	}

 	startGame(){
		alert("Game Started");
		this.makeSelectable(this.player1AuxBoard);
  		this.currentPlayState = 0;

		alert("getPrologRequest test call, brace yourselves");
		this.getPrologRequest("getInitialBoard", null, null, 8081);
		alert("k done proceed");
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