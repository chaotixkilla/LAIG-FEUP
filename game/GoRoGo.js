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

		this.selectedPiece = null;
		this.selectedDestination = null;

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
		this.botDifficulty = 0;
		this.timeElapsed = 0;

		this.started = false;
		this.paused = false;

		this.addPiecesToPlayers();
		this.placeInitialPieces();

		this.prologBoard = "default";
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
 		var startingPosition = piece.tile;
 		this.unbindPieceToTile(startingPosition, piece);
 		this.bindPieceToTile(tile, piece);
 	}

 	animatePlay(destination, piece){
        var startingPosition = piece.tile;

        var animation = new PieceAnimation(piece, startingPosition, destination);
        this.scene.gameAnimations.push(animation);
        piece.moving = true;

        //console.log("HERE");
        
        this.makePlay(destination, piece);
        this.resolveBoard();
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
            this.selectedPiece = this.allPieces[24];
            this.selectedDestination = pickedTile;
            this.bindPieceToTile(this.selectedDestination, this.selectedPiece);
            this.currentPlayer++;
            this.currentPlayState = 0;
            if(this.currentPlayer % 2 == 0){
                console.log("Player 1 playing");
            	this.makeSelectable(this.player1AuxBoard);
			}
			else{
                console.log("Player 2 playing");
            	this.makeSelectable(this.player2AuxBoard);
			}
		}

		else if(this.currentState == 2){
			if(this.currentPlayState == 0){
				this.selectedPiece = pickedTile.placedPiece;
                pickedTile.selected = true;
				this.currentPlayState++;
                console.log("Place the selected piece on the board");
				this.makeSelectable(this.mainBoard);
				this.highlightPossibleMoves();
			}
			else if(this.currentPlayState == 1){
				console.log("Doing play");
                this.selectedDestination = pickedTile;
                pickedTile.selected = true;
                this.currentPlayer++;
                this.currentPlayState = 0;
                if(this.currentPlayer % 2 == 0){
                    console.log("Player 1 playing");
                    this.makeSelectable(this.player1AuxBoard);
                }
                else{
                    console.log("Player 2 playing");
                    this.makeSelectable(this.player2AuxBoard);
                }
                this.animatePlay(this.selectedDestination, this.selectedPiece);
                //console.log(pickedTile.selected);
                this.removeHighlights();
			}
		}
  	}

  	highlightPossibleMoves(){
  		for(var i = 0; i < this.mainBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.mainBoard.boardMatrix[i].length; j++){
				if(!this.mainBoard.boardMatrix[i][j].occupied){
					this.mainBoard.boardMatrix[i][j].highlighed = true;
				}
 			}
  		}
  	}

  	removeHighlights(){
  		for(var i = 0; i < this.mainBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.mainBoard.boardMatrix[i].length; j++){
				if(this.mainBoard.boardMatrix[i][j].highlighed){
					this.mainBoard.boardMatrix[i][j].highlighed = false;
				}
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
  	}

  	firstTurn(){
  		this.highlightPossibleMoves();
 		this.makeSelectable(this.mainBoard);
 		this.currentState = 1;
 		this.currentPlayer = 0;
  	}

 	startGame(){
 		this.started = true;

		alert("getPrologRequest: getFreshBoard");
		this.getFreshBoard();
		
		//alert("getPrologRequest: checkBoardSurroundings");
		//this.checkBoardSurroundings();

		//alert("getPrologRequest: startGamePVP");
		//this.startGamePVP();
		
		//alert("getPrologRequest: askPlay");
		//askPlay(this.prologBoard, 'black', [], HengePieces, 'human', 0);
		
		alert("getPrologRequest: checkSurroundingPiecesMid");
		this.checkSurroundingPiecesMid(1, 2, 2, 2, 2);
//CurrPlayerPiece, UpperPiece, BottomPiece, LeftPiece, RightPiece){

		alert("getPrologRequest: checkSurroundingPiecesSides");
		this.checkSurroundingPiecesSides(1, 2, 2, 2);	
//CurrPlayerPiece, UpperPiece, BottomPiece, RightPiece){

		alert("getPrologRequest: checkSurroundingPiecesCorner");
		this.checkSurroundingPiecesCorner(1, 2, 2);
//CurrPlayerPiece, RightPiece, BottomPiece){

		alert("getPrologRequest: checkEatingPiecesMiddle");
		this.checkEatingPiecesMiddle('[[0,2,0,0,0],[2,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]', 1, 1, 1, 1, 1, 1, 1);		
//Board, Row, Col, Piece, UpperPiece, BottomPiece, LeftPiece, RightPiece){
//'[[0,2,0,0,0],[2,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]';



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

	resolveBoard(){
		for(var i = 0; i < this.mainBoard.boardMatrix.length; i++){
			for(var j = 0; j < this.mainBoard.boardMatrix[i].length; j++){
				if(this.mainBoard.boardMatrix[i][j].placedPiece != null){
					var currentPiece = this.mainBoard.boardMatrix[i][j].placedPiece.type;
				}
				if(this.mainBoard.boardMatrix[i][j].placedPiece == null){
					var currentPiece = 0;
				}
				console.log(currentPiece);
			}
		}
	}

	addGameGUI(){
		var gameInterface = this.scene.interface;
		gameInterface.game = gameInterface.gui.addFolder('Game');
		gameInterface.game.open();

		//Start Game button
		var btn = {'Start Game':this.startGame.bind(this) };
		gameInterface.game.startBtn = gameInterface.game.add(btn, 'Start Game');

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

		//Pause Game button
		gameInterface.game.add(this, 'paused').name('Pause');

		//Undo button
		var ndbtn = {'Undo':function(){
			this.undo();
		}.bind(this)};
		var undoBtn = gameInterface.game.add(ndbtn, 'Undo');
	}

	undo(){
		alert('Play Undoer Simulator');
	}

/*
	parseBoard(plBoard){
		console.log('Prolog Board: ' + plBoard);

		function replaceStr(str, find, replace){
			for(var i= 0; i < find.length; i++){
				str = str.replace(new RegExp(find[i], 'g'), replace[i]);
			}
			return str;
		}

		var find = ["0", "1", "2"];
		var replace = ["'0'", "'1'", "'2'"];
		this.prologBoard = replace(plBoard, find, replace);

		console.log('After parsing prolog board: ' + this.mainBoard);
	}
*/

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

	/*
	checkBoardSurroundings(){

		console.log("HERE");
		var plBoard = '[[0,2,0,0,0],[2,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]';
		var requestString = 'checkBoardSurroundings(' + plBoard + ',1,1,1)'; 
		console.log('' + requestString);

		this.getPrologRequest(requestString);
	}
	*/

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
		var requestString = 'checkEatingPiecesMiddle(' + Board + ',' + Row + ',' + Col + ',' + Piece + ',' + UpperPiece + ',' + BottomPiece + ',' + LeftPiece + ',' + RightPiece + ',' + ')';
		this.getPrologRequest(requestString);
	}

	checkEatingPiecesSides(Board, Row, Col, Piece, LeftPiece, RightPiece, BottomPiece){
		var requestString = 'checkEatingPiecesSides(' + Board + ',' + Row + ',' + Col + ',' + Piece + ',' + UpperPiece + ',' + BottomPiece + ',' + LeftPiece + ',' + RightPiece + ')' ;
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
			game.parseBoard(game.prologBoard);
		}

		if(requestString == "startGamePVP"){
			console.log("startGamePVP response: " + response);
		}

		if(requestString.substring(0, 10) == "checkPlays"){
			game.prologBoard = response;
			console.log("checkPlays response: " + response);
			game.parseBoard(game.prologBoard);
		}

		if(requestString.substring(0, 7) == "askPlay"){
			game.prologBoard = response;
			console.log("askPlay response: " + response);
			game.parseBoard(game.prologBoard);
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

	  }

	  request.onerror = onError || function(){console.log("Error waiting for response");};

	  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	  request.send();
	}

	

}