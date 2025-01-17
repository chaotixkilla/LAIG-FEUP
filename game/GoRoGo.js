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
		this.player1NormalPiecesCount = 12;
		this.player2Pieces = [];
		this.player2Score = 0;
		this.player2NormalPiecesCount = 12;

		this.selectedPiece = null;
		this.selectedDestination = null;

		this.allPieces = [];

		this.states = ['Waiting for a game to start', 'First play (the henge piece left)', 'Game being played', 'Game finished', 'Replaying a game'];
		this.playPieceStates = ['Piece picked up', 'Piece waiting to be placed'];
		this.gameStateString = 'Waiting for a game to start.';
		this.playStateString = '';

		this.currentState = 0;
		this.currentPlayState = -1;
		this.currentPlayer = -1;
		this.currentPickableBoard = null;

		this.playTime = 0;
		this.timeoutTime = 10;
		this.timeout = false;
		this.currScene = "Traditional";
		this.currCamera = 0;
		this.gameMode = 0;
		this.botDifficulty = 0;
		this.timeElapsed = 0;

		this.started = false;
		this.paused = false;

		this.addPiecesToPlayers();
		this.placeInitialPieces();

		this.prologBoard = "default";
		this.prologAnswer = null;

		this.answerMatrix = [];

		this.possibleMoves = 0;

		this.playHistory = [];
		this.boardHistory = [];
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
		this.player1NormalPiecesCount = 10;
		this.player2NormalPiecesCount = 10;
		this.player1Score = 0;
		this.player2Score = 0;
		this.playHistory = [];

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

 	getFirstGraveyardAvailableTile(){
		for(var i = 0; i < this.player1Graveyard.boardMatrix.length; i++){
			for(var j = 0; j < this.player1Graveyard.boardMatrix[i].length; j++){
				if(!this.player1Graveyard.boardMatrix[i][j].occupied){
					return this.player1Graveyard.boardMatrix[i][j];
				}
			}
		}
	}

    getSecondGraveyardAvailableTile(){
        for(var i = 0; i < this.player2Graveyard.boardMatrix.length; i++){
            for(var j = 0; j < this.player2Graveyard.boardMatrix[i].length; j++){
                if(!this.player2Graveyard.boardMatrix[i][j].occupied){
                    return this.player2Graveyard.boardMatrix[i][j];
                }
            }
        }
    }

    getFirstPlayerAvailableTile(){
		for(var i = 0; i < this.player1AuxBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.player1AuxBoard.boardMatrix[i].length; j++){
				if(!this.player1AuxBoard.boardMatrix[i][j].occupied){
					return this.player1AuxBoard.boardMatrix[i][j];
				}
			}
		}
	}

	getSecondPlayerAvailableTile(){
		for(var i = 0; i < this.player2AuxBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.player2AuxBoard.boardMatrix[i].length; j++){
				if(!this.player2AuxBoard.boardMatrix[i][j].occupied){
					return this.player2AuxBoard.boardMatrix[i][j];
				}
			}
		}
	}

    checkForEating(){
		for(var i = 0; i < this.mainBoard.boardMatrix.length; i++) {
            for (var j = 0; j < this.mainBoard.boardMatrix[i].length; j++) {
            	//console.log(this.answerMatrix[this.mainBoard.boardMatrix.length * i + j]);
				if(this.answerMatrix[this.mainBoard.boardMatrix.length * i + j] == 2){
                    var availableTile;
                    if(this.currentPlayer % 2){
                        availableTile = this.getFirstGraveyardAvailableTile();
                        this.player2Score++;
                    }
                    else{
                        availableTile = this.getSecondGraveyardAvailableTile();
                        this.player1Score++;
                    }

					var eatenPiece = this.mainBoard.boardMatrix[i][j].placedPiece;
                    var animation = new PieceDieAnimation(eatenPiece, this.mainBoard.boardMatrix[i][j], availableTile);
                    //var animation = new PieceAnimation(eatenPiece, availableTile, this.mainBoard.boardMatrix[i][j]);
                    this.scene.gameAnimations.push(animation);
                    eatenPiece.moving = true;
                    this.unbindPieceToTile(this.mainBoard.boardMatrix[i][j], eatenPiece);
                    this.bindPieceToTile(availableTile, eatenPiece);
				}
            }
        }
	}

/*
	updateScores(){
		this.player1Score = 12 - this.player2Pieces.length;
		this.player2Score = 12 - this.player1Pieces.length;
	}
*/

 	makePlay(tile, piece){
 		var play = [tile, piece];
 		var startingPosition = piece.tile;
 		this.unbindPieceToTile(startingPosition, piece);
 		this.bindPieceToTile(tile, piece);
 		this.removePieceFromPlayer(piece);
        this.checkForEating();
 		this.updatePrologBoard();
 		this.playHistory.push(play);
 		this.boardHistory.push(this.mainBoard);
 		//this.boardToString(this.mainBoard);
 	}

 	isGameOver(){
 		if(this.currentPlayer % 2 == 0){
 			if(this.possibleMoves == 0 || this.player2NormalPiecesCount == 0){
 				this.gameStateString = 'White player wins!';
 				if(this.possibleMoves == 0){
 					this.playStateString = 'Black player ran out of moves.';
 				}
 				else if(this.player2NormalPiecesCount == 0){
 					this.playStateString = 'Black player ran out of normal pieces.';
 				}
 				return true;
 			}
 			return false;
 		}
 		else{
 			if(this.possibleMoves == 0 || this.player1NormalPiecesCount == 0){
 				this.gameStateString = 'Black player wins!';
 				if(this.possibleMoves == 0){
 					this.playStateString = 'White player ran out of moves.';
 				}
 				else if(this.player1NormalPiecesCount == 0){
 					this.playStateString = 'White player ran out of normal pieces.';
 				}
 				return true;
 			}
 			return false;
 		}
 	}

 	removePieceFromPlayer(piece){
 		console.log(piece);
 		if(piece.type == 1){
 			this.player1NormalPiecesCount--;
 		}
 		else if(piece.type == 2){
 			this.player2NormalPiecesCount--;
 		}
 	}

 	boardToString(board){
 		var str = "[";
 		for(var i = 0; i < board.boardMatrix.length; i++){
 			str += "[";
 			for(var j = 0; j < board.boardMatrix[i].length; j++){
 				if(board.boardMatrix[i][j].placedPiece == null){
 					str += "0";
 				}
 				else{
 					if(board.boardMatrix[i][j].placedPiece.type == 3){
 						str += "3";
 					}
 					if(board.boardMatrix[i][j].placedPiece.type == 2){
 						str += "2";
 					}
 					if(board.boardMatrix[i][j].placedPiece.type == 1){
 						str += "1";
 					}
 				}
 				if(j < board.boardMatrix[i].length-1){
 					str += ",";
 				}
 			}
 			str += "]";
 			if(i < board.boardMatrix.length-1){
 				str += ",";
 			}
 		}
 		str += "]";

 		return str;
 	}

 	updatePrologBoard(){
 		//console.log("before: " + this.prologBoard);
 		this.prologBoard = this.boardToString(this.mainBoard);
 		//console.log("after: " + this.prologBoard);
		this.getAnswerArray(this.prologBoard, this.currentPlayer%2 + 1);
 	}

 	animatePlay(destination, piece){
        var startingPosition = piece.tile;

        var animation = new PieceAnimation(piece, startingPosition, destination);
        this.scene.gameAnimations.push(animation);
        piece.moving = true;
        
        this.makePlay(destination, piece);
	}

 	async pickTile(index){

 		console.log("player1 normal: " + this.player1NormalPiecesCount);
 		console.log("player2 normal: " + this.player2NormalPiecesCount);

  		if(this.started){
  			var pickedTileID = index-1;
			for(var i = 0; i < this.currentPickableBoard.boardMatrix.length; i++){
				for(var j = 0; j < this.currentPickableBoard.boardMatrix[i].length; j++){
					if(this.currentPickableBoard.boardMatrix[i][j].id == pickedTileID){
						var pickedTile = this.currentPickableBoard.boardMatrix[i][j];
					}
				}
			}

			if(this.currentState == 1){
				this.gameStateString = 'Game being played.';
				pickedTile.selected = true;
				this.removeHighlights();
				this.updatePrologBoard();
				this.currentState++;
	            this.selectedDestination = pickedTile;
    	        this.bindPieceToTile(this.selectedDestination, this.selectedPiece);
        	    this.currentPlayer++;
            	this.currentPlayState = 0;
	            if(this.currentPlayer % 2 == 0){
    	            this.playStateString = 'White player playing.';
        	    	this.makeSelectable(this.player1AuxBoard); 
				}
				else{
            	    this.playStateString = 'Black player playing.';
          		  	this.makeSelectable(this.player2AuxBoard);
				}
			}

			else if(this.currentState == 2){
				if(this.currentPlayState == 0){
					this.selectedPiece = pickedTile.placedPiece;
                	pickedTile.selected = true;
					this.currentPlayState++;
                	this.playStateString = 'Place the selected piece on the board';
					this.makeSelectable(this.mainBoard);
					await sleep(1000);
					this.highlightPossibleMoves();
				}
				else if(this.currentPlayState == 1){
					console.log("Doing play");
                	this.selectedDestination = pickedTile;
                	pickedTile.selected = true;
                	this.currentPlayer++;
                	this.currentPlayState = 0;
                	if(this.currentPlayer % 2 == 0){
                    	this.playStateString = 'White player playing.';
                    	this.makeSelectable(this.player1AuxBoard);
                	}
                	else{
                    	this.playStateString = 'Black player playing.';
                    	this.makeSelectable(this.player2AuxBoard);
                	}
                	this.animatePlay(this.selectedDestination, this.selectedPiece);
                	if(this.isGameOver()){
						this.started = false;
					}
                	this.answerMatrix = [];
                	this.removeHighlights();
				}
			}
  		}
  		return;
  	}

  	getAnswerArray(board, type){
		//console.log("type: " + type);
        for(var i = 0; i < this.mainBoard.boardMatrix.length; i++){
            for(var j = 0; j < this.mainBoard.boardMatrix[i].length; j++){
            	this.checkBoard(board, this.mainBoard.boardMatrix[i][j].x, this.mainBoard.boardMatrix[i][j].y, type);
            }
        }
	}

  	highlightPossibleMoves(){
        //console.log(this.answerMatrix);
        //this.getAnswerArray(this.prologBoard, this.mainBoard.boardMatrix[i][j].x, this.mainBoard.boardMatrix[i][j].y, this.selectedPiece.type);

  		if(this.selectedPiece.type == 3){
  			for(var i = 0; i < this.mainBoard.boardMatrix.length; i++){
				for(var j = 0; j < this.mainBoard.boardMatrix[i].length; j++){
					if(!this.mainBoard.boardMatrix[i][j].occupied){
						this.mainBoard.boardMatrix[i][j].highlighed = true;
						this.possibleMoves++;
					}
 				}
  			}
  		}
  		else{
            for(var i = 0; i < this.mainBoard.boardMatrix.length; i++){
                for(var j = 0; j < this.mainBoard.boardMatrix[i].length; j++){
                	//console.log(this.answerMatrix[this.mainBoard.boardMatrix.length*i+j]);
                    if(!this.mainBoard.boardMatrix[i][j].occupied && this.answerMatrix[this.mainBoard.boardMatrix.length*i+j] == 1){
                        this.mainBoard.boardMatrix[i][j].highlighed = true;
                        this.possibleMoves++;
                    }
                }
            }
		}
		console.log(this.possibleMoves);
  	}

  	removeHighlights(){
  		for(var i = 0; i < this.mainBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.mainBoard.boardMatrix[i].length; j++){
				//if(this.mainBoard.boardMatrix[i][j].highlighed){
					this.mainBoard.boardMatrix[i][j].highlighed = false;
				//}
                this.mainBoard.boardMatrix[i][j].selected = false;
 			}
  		}

        for(var i = 0; i < this.player1AuxBoard.boardMatrix.length; i++){
            for(var j = 0; j < this.player1AuxBoard.boardMatrix[i].length; j++){
                this.player1AuxBoard.boardMatrix[i][j].selected = false;
            }
        }

        for(var i = 0; i < this.player2AuxBoard.boardMatrix.length; i++){
            for(var j = 0; j < this.player2AuxBoard.boardMatrix[i].length; j++){
                this.player2AuxBoard.boardMatrix[i][j].selected = false;
            }
        }
        this.possibleMoves = 0;
  	}

  	firstTurn(){
  		this.gameStateString = 'Game started.';
  		this.playStateString = 'Last Henge piece being played by the white player.';
        this.selectedPiece = this.allPieces[24];
  		this.highlightPossibleMoves();
 		this.makeSelectable(this.mainBoard);
 		this.currentState = 1;
 		this.currentPlayer = 0;
  	}

 	startGame(){
 		this.started = true;
 		this.answerMatrix = [];

		this.getFreshBoard();
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

		//Cameras dropdown
		var cameraDropdown = gameInterface.game.add(this, 'currCamera',
		{'Default View' : 0,
		 'Top View'     : 1,
		 'White View'   : 2,
		 'Black View'   : 3,
		 'Scenery View' : 4
		}).name('Camera');
		cameraDropdown.__select.selectedIndex = this.currCamera;

		//Game Mode dropdown
		var gameModeDropdown = gameInterface.game.add(this, 'gameMode',
		{'Player X Player' : 0,
		 'Player X CPU'	   : 1,
		 'CPU X CPU'	   : 2
		 }).name('Game Mode');
		gameModeDropdown.__select.selectedIndex = this.gameMode;

		//Bot Difficulty dropdown
		var botDifficultyDropdown = gameInterface.game.add(this, 'botDifficulty',
		{'Easy'   : 0,
		 'Medium' : 1,
		 'Hard'   : 2
		}).name('Bot Difficulty');
		botDifficultyDropdown.__select.selectedIndex = this.botDifficulty;

		//Play Timeout checkbox, Timeout Duration slider
		var timeoutBtn = gameInterface.game.add(this, 'timeout').name('Play Timeout');
		timeoutBtn.onFinishChange(function(){
			if(this.timeout)
				this.playTime = this.timeoutTime;
			else
				this.playTime = 0;
		}.bind(this));
		gameInterface.game.add(this, 'timeoutTime').min(10).max(60).step(5).name('Timeout Duration');

		//Time Counter
		gameInterface.game.add(this, 'timeElapsed').listen().name('Time Elapsed');

		//White Score Counter
		gameInterface.game.add(this, 'player1Score').listen().name('White Score');

		//Black Score Counter
		gameInterface.game.add(this, 'player2Score').listen().name('Black Score');

		//Game State
		gameInterface.game.add(this, 'gameStateString').listen().name('Game State');

		//Play State
		gameInterface.game.add(this, 'playStateString').listen().name('Play State');

		//Pause Game button
		gameInterface.game.add(this, 'paused').name('Pause');

		//Undo button
		var ndbtn = {'Undo':function(){
			this.undo();
		}.bind(this)};
		var undoBtn = gameInterface.game.add(ndbtn, 'Undo');
	}

	undo(){
		if(this.playHistory.length > 0 && this.boardHistory.length > 0 && this.currentState == 2 && this.currentPlayState != 1){
			var lastPlay = this.playHistory[this.playHistory.length-1];
			var lastBoard = this.boardHistory[this.boardHistory.length-1];
			this.currentPlayer--;
			console.log(this.selectedPiece);
			console.log(this.selectedPiece.tile);
			this.unbindPieceToTile(lastPlay[1].tile, lastPlay[1]);
			console.log("HERE");
			if(this.currentPlayer % 2 == 0){
        	    console.log("Player 1 playing");
        	  	this.makeSelectable(this.player1AuxBoard);
        	  	var availableTile = this.getFirstPlayerAvailableTile();
       		}
        	else{
        	 	console.log("Player 2 playing");
        	  	this.makeSelectable(this.player2AuxBoard);
        	  	var availableTile = this.getSecondPlayerAvailableTile();

       		}
       		this.bindPieceToTile(availableTile, lastPlay[1]);
       		this.mainBoard = lastBoard;
       		this.playHistory.pop();
       		this.boardHistory.pop();
		}
		else if(this.currentState != 2){
			alert('You cannot undo while the game hasn\'t started!');
		}
		else if(this.playHistory.length == 0 && this.boardHistory.length == 0){
			alert('You cannot undo while there weren\'t made any plays!');
		}
		else if(this.currentPlayState == 1){
			alert('You cannot undo in the middle of a play!');
		}
	}

	parseBoard(plBoard){
	  console.log('Board do prolog :' + plBoard);

	  function replaceStr(str, find, replace) {
	    for (var i = 0; i < find.length; i++) {
	        str = str.replace(new RegExp(find[i], 'g'), replace[i]);
	    }
	    return str;
	  }
	  
	  var find = ["0","1","2"];
	  var replace = ["'0'","'1'","'2'"];
	  this.prologBoard = replaceStr(plBoard, find, replace);

	  console.log('After parsing prolog Board :' + this.prologBoard);
	}

//------------------------- PROLOG PREDICATES ----------------------------

	getFreshBoard(){
		this.getPrologRequest("getFreshBoard");
	}


	startGamePVP(){
		this.getPrologRequest("startGamePVP");
	}

	checkGameOver(plBoard, Name1, Pieces1, HengePieces1, PlayerType1, Score1, Name2, Pieces2, HengePieces2, PlayerType2, Score2){

		var requestString = 'checkGameOver(' + this.prologBoard + ',' + '-1,[' 
			+ Name1 + ',' + Pieces1 + ',' + HengePieces1 + ',' + PlayerType1 + ',' + Score1 + '],['
			+ Name2 + ',' + Pieces2 + ',' + HengePieces2 + ',' + PlayerType2 + ',' + Score2 + '])';

	this.getPrologRequest(requestString);
	}

	askPlay(BoardIn, Name, Pieces, HengePieces, PlayerType, Score){

		var requestString = 'askPlay(' + this.prologBoard + ',[' + Name + ',' + Pieces + ',' + HengePieces + ',' + PlayerType + ',' + Score + '])';	
		this.getPrologRequest(requestString);
	}

	checkSurroundingPiecesMid(CurrPlayerPiece, UpperPiece, BottomPiece, LeftPiece, RightPiece){

		var requestString = 'checkSurroundingPiecesMid(' + CurrPlayerPiece + ',' + UpperPiece + ',' + BottomPiece + ',' + LeftPiece + ',' + RightPiece + ')';
		this.getPrologRequest(requestString);
	}

	checkSurroundingPiecesSides(CurrPlayerPiece, UpperPiece, BottomPiece, RightPiece){
		var requestString = 'checkSurroundingPiecesSides(' + CurrPlayerPiece + ',' + UpperPiece + ',' + BottomPiece + ',' + RightPiece + ')';
		this.getPrologRequest(requestString);
	}

	checkSurroundingPiecesCorner(CurrPlayerPiece, RightPiece, BottomPiece){
		var requestString = 'checkSurroundingPiecesCorner(' + CurrPlayerPiece + ',' + RightPiece + ',' + BottomPiece + ')';
		this.getPrologRequest(requestString);
	}

	checkEatingPiecesMiddle(Board, Row, Col, Piece, UpperPiece, BottomPiece, LeftPiece, RightPiece){
		var requestString = 'checkEatingPiecesMiddle(' + Board + ',' + Row + ',' + Col + ',' + Piece + ',' + UpperPiece + ',' + BottomPiece + ',' + LeftPiece + ',' + RightPiece + ')';
		this.getPrologRequest(requestString);
	}

	checkEatingPiecesSides(Board, Row, Col, Piece, LeftPiece, RightPiece, BottomPiece){
		var requestString = 'checkEatingPiecesSides(' + Board + ',' + Row + ',' + Col + ',' + Piece + ',' + LeftPiece + ',' + RightPiece + ',' + BottomPiece + ')';
		this.getPrologRequest(requestString);
	}

	checkEatingPiecesCorner(Board, Row, Col, Piece, RightPiece, BottomPiece){
		var requestString = 'checkEatingPiecesCorner(' + Board + ',' + Row + ',' + Col + ',' + Piece + ',' + RightPiece + ',' + BottomPiece + ')';
		this.getPrologRequest(requestString);
	}

	checkBoardSurroundings(CurrPlayerPiece, UpperPiece, BottomPiece, LeftPiece, RightPiece, Board, Row, Col, Piece){
			console.log("getPrologRequest: ~checkBoardSurroundings ~");
			console.log("PiecesMid");
			checkSurroundingPiecesMid(CurrPlayerPiece, UpperPiece, BottomPiece, LeftPiece, RightPiece);
			console.log("PiecesSides");
			checkSurroundingPiecesSides(CurrPlayerPiece, UpperPiece, BottomPiece, RightPiece);
			console.log("PiecesCorner");
			checkSurroundingPiecesCorner(CurrPlayerPiece, RightPiece, BottomPiece);
			console.log("EatingPiecesMiddle");
			checkEatingPiecesMiddle(Board, Row, Col, Piece, UpperPiece, BottomPiece, LeftPiece, RightPiece);
			console.log("EatingPiecesSides");
			checkEatingPiecesSides(Board, Row, Col, Piece, LeftPiece, RightPiece, BottomPiece);
			console.log("EatingPiecesCorner");
			checkEatingPiecesCorner(Board, Row, Col, Piece, RightPiece, BottomPiece);
			console.log("End of ~checkBoardSurroundings~");
	}

	checkBoard(Board, Row, Col, CurrPlayer){
		var requestString = 'checkBoard(' + Board + ',' + Row + ',' + Col + ',' + CurrPlayer + ')';
		this.getPrologRequest(requestString);
	}



//------------------------- PROLOG PREDICATES ----------------------------

	getPrologRequest(requestString, onSuccess, onError, port){

	  var game = this;
	  var requestPort = port || 8081;
	  var request = new XMLHttpRequest();
	  request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

	  request.onload = onSuccess || function(data){
		var response = data.target.response;

		if(requestString == "getFreshBoard"){
			game.prologBoard = response;
			console.log("getFreshBoard response: " + response);
			//game.parseBoard(game.prologBoard);
		}

		if(requestString == "startGamePVP"){
			console.log("startGamePVP response: " + response);
		}

		if(requestString.substring(0, 10) == "checkPlays"){
			game.prologBoard = response;
			console.log("checkPlays response: " + response);
			//game.parseBoard(game.prologBoard);
		}

		if(requestString.substring(0, 7) == "askPlay"){
			game.prologBoard = response;
			console.log("askPlay response: " + response);
			//game.parseBoard(game.prologBoard);
		}

		if(requestString.substring(0, 22) == "checkBoardSurroundings"){
			
			console.log("checkBoardSurroundings response: " + response);
		}

		if(requestString.substring(0, 27) == "checkSurroundingPiecesSides"){
			console.log("checkSurroundingPiecesSides response: " + response);
		}


		if(requestString.substring(0, 28) == "checkSurroundingPiecesCorner"){
			console.log("checkSurroundingPiecesCorner response: " + response);
		}


		if(requestString.substring(0, 23) == "checkEatingPiecesMiddle"){
			console.log("checkEatingPiecesMiddle response: " + response);
		}


		if(requestString.substring(0, 25) == "checkSurroundingPiecesMid"){
			console.log("checkSurroundingPiecesMid response: " + response);
		}


		if(requestString.substring(0, 22) == "checkEatingPiecesSides"){
			console.log("checkEatingPiecesSides response: " + response);
		}


		if(requestString.substring(0, 23) == "checkEatingPiecesCorner"){
			console.log("checkEatingPiecesCorner response: " + response);
		}

		if(requestString.substring(0, 10) == "checkBoard"){
			game.prologAnswer = response;
			game.answerMatrix.push(game.prologAnswer);
			//console.log(game.answerMatrix);
			//console.log("checkBoard response: " + response);
		}

	  }

	  request.onerror = onError || function(){console.log("Error waiting for response");};

	  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	  request.send();
	}

}

function sleep(ms) {
  	return new Promise(resolve => setTimeout(resolve, ms));
}