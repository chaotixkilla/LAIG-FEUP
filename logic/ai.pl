:- use_module(library(random)).

startGamePvE(white) :-
	freshBoard(X),
	createPlayer(white, 10, 2, Player1, human, 0),
	createPlayer(black, 10, 2, Player2, bot, 0),
	gameLoop(X, -1, Player1, Player2).
	
startGamePvE(black) :-
	freshBoard(X),
	createPlayer(white, 10, 2, Player1, bot, 0),
	createPlayer(black, 10, 2, Player2, human, 0),
	gameLoop(X, -1, Player1, Player2).
	
startGameEvE :-
	freshBoard(X),
	createPlayer(white, 10, 2, Player1, bot, 0),
	createPlayer(black, 10, 2, Player2, bot, 0),
	gameLoop(X, -1, Player1, Player2).