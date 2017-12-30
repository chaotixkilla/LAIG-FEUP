%finish condition
gameLoop(_, 26, _, _, _) :- mainMenu, !.

gameLoop(_, _, [_, 0, _, _, _], [_, _, _, _, _]) :- gameOverMenu('Black', 'Out of normal pieces.').

gameLoop(_, _, [_, _, _, _, _], [_, 0, _, _, _]) :- gameOverMenu('White', 'Out of normal pieces.').

%first round henge placing
gameLoop(Board, -1, [Name1, Pieces1, HengePieces1, human, Score1], [Name2, Pieces2, HengePieces2, PlayerType2, Score2]) :-

	%clearScreen,
	printBoard(Board),
	write('White player has to place the last henge piece available'), nl,
	
	repeat,
	write('Select Row: '),
	read(Row),
	get_code(_),
	write('Select Column: '),
	read(Col),
	get_code(_),
	checkBoard(Board, Row, Col, [Name1, Pieces1, HengePieces1, human, Score1], Return),
	write(Return), nl,
	!,
	
	setPiece(Board, Row, Col, 3, BoardOut),
	gameLoop(BoardOut, 0, [Name1, Pieces1, HengePieces1, human, Score1], [Name2, Pieces2, HengePieces2, PlayerType2, Score2]).
	
gameLoop(Board, -1, [Name1, Pieces1, HengePieces1, bot, Score1], [Name2, Pieces2, HengePieces2, PlayerType2, Score2]) :-

	%clearScreen,
	printBoard(Board),
	write('White player has to place the last henge piece available'), nl,
	
	random(1, 6, Col),
	random(1, 6, Row),
	
	setPiece(Board, Row, Col, 3, BoardOut),
	gameLoop(BoardOut, 0, [Name1, Pieces1, HengePieces1, bot, Score1], [Name2, Pieces2, HengePieces2, PlayerType2, Score2]).

%gameloop predicate
gameLoop(Board, Counter, [Name1, Pieces1, HengePieces1, PlayerType1, Score1], [Name2, Pieces2, HengePieces2, PlayerType2, Score2]) :-
	%clearScreen,
	printBoard(Board),
	
	write('Press ENTER to continue'),
	get_code(_),
	
	Counter1 is Counter + 1,
	write('Current turn: '),
	write(Counter1), nl,
	checkTurn(Counter1, [Name1, Pieces1, HengePieces1, PlayerType1, Score1], [Name2, Pieces2, HengePieces2, PlayerType2, Score2], CurrPlayer),
	printPlayer(CurrPlayer),
	
	write(CurrPlayer), nl,
	setof([Row, Col], checkPlays(Board, Row, Col, CurrPlayer, 1), List),
	write(List), nl,
	length(List, NumberOfAvailablePlays),
	write('Available Plays: '), write(NumberOfAvailablePlays), nl,
	
	repeat,
	askPlay(Board, CurrPlayer, BoardOut, CurrPlayerOut),
	!,
	
	updateBoard(BoardOut, CurrPlayerOut, BoardOut2, CurrPlayerOut2),
	
	nth1(1, CurrPlayerOut2, CurrPlayerName),
	gameLoopDecider(CurrPlayerName, BoardOut2, Counter1, CurrPlayerOut2, [Name1, Pieces1, HengePieces1, PlayerType1, Score1], [Name2, Pieces2, HengePieces2, PlayerType2, Score2]).

%game loop auxiliary
gameLoopDecider('white', BoardOut, Counter1, CurrPlayerOut, _, Player2) :- gameLoop(BoardOut, Counter1, CurrPlayerOut, Player2).
gameLoopDecider('black', BoardOut, Counter1, CurrPlayerOut, Player1, _) :- gameLoop(BoardOut, Counter1, Player1, CurrPlayerOut).
	
%fresh game start
startGamePvP :-
	freshBoard(X),
	createPlayer(white, 10, 2, Player1, human, 0),
	createPlayer(black, 10, 2, Player2, human, 0),
	gameLoop(X, -1, Player1, Player2).
	
%creates a player
createPlayer(Name, Pieces, HengePieces, PlayerInfo, PlayerType, Score) :- 
	PlayerInfo = [Name, Pieces, HengePieces, PlayerType, Score].
	
%prints player info
printPlayer(Player) :-
	nth1(1, Player, PlayerName),
	printPlayerAux(PlayerName),
	nth1(2, Player, PlayerPieces),
	nth1(3, Player, PlayerHengePieces),
	nth1(5, Player, PlayerScore),
	write(PlayerPieces),
	write(' normal pieces, '),
	write(PlayerHengePieces),
	write(' henge pieces.'),
	write(' Score: '), write(PlayerScore), nl.

%player print auxiliary
printPlayerAux('white') :- write('White player info: ').
printPlayerAux('black') :- write('Black player info: ').
	
%asks the user for a play
askPlay(BoardIn, [Name, Pieces, HengePieces, human, Score], BoardOut, [NameOut, PiecesOut, HengePiecesOut, human, ScoreOut]) :-
	write('Make a play, '), write(Name), write(' player.'), nl,
	
	write('Which type of piece do you want to play? (1 for Normal, 2 for Henge)'), nl,
	
	repeat,
	read(PieceType),
	readPieceType(PieceType),
	!,
	
	repeat,
	write('Select Row: '),
	read(Row),
	get_code(_),
	write('Select Column: '),
	read(Col),
	get_code(_),
	checkBoard(BoardIn, Row, Col, [Name, Pieces, HengePieces, human, Score], Return),
	write('Return = '), write(Return), nl,
	!,
	
	selectPiece(Name, PieceType, PieceToPlace),
	
	setPiece(BoardIn, Row, Col, PieceToPlace, BoardOut),
	removePieceFromPlayer([Name, Pieces, HengePieces, human, Score], PieceType, [NameOut, PiecesOut, HengePiecesOut, human, ScoreOut]).
	
askPlay(BoardIn, [Name, Pieces, HengePieces, bot, Score], BoardOut, [NameOut, PiecesOut, HengePiecesOut, bot, ScoreOut]) :-
	write('Make a play, '), write(Name), write(' player.'), nl,
	
	write('Which type of piece do you want to play? (1 for Normal, 2 for Henge)'), nl,
	
	repeat,
	random(1, 3, PieceType),
	readPieceType(PieceType),
	print(PieceType),
	!,
	
	setof([Row, Col], checkPlays(BoardIn, Row, Col, [Name, Pieces, HengePieces, bot, Score], 1), List),
	write(List), nl,
	length(List, NumberOfAvailablePlays),
	NumberOfAvailablePlays1 is NumberOfAvailablePlays + 1,
	
	random(1, NumberOfAvailablePlays1, Selection),
	nth1(Selection, List, SelectionCoords),
	write(SelectionCoords), nl,
	
	nth1(1, SelectionCoords, SelectionX),
	nth1(2, SelectionCoords, SelectionY),
	
	checkBoard(BoardIn, SelectionX, SelectionY, [Name, Pieces, HengePieces, bot, Score], Return),
	write('Return = '), write(Return), nl,
	
	selectPiece(Name, PieceType, PieceToPlace),
	
	setPiece(BoardIn, SelectionX, SelectionY, PieceToPlace, BoardOut),
	removePieceFromPlayer([Name, Pieces, HengePieces, bot, Score], PieceType, [NameOut, PiecesOut, HengePiecesOut, bot, ScoreOut]).
	
readPieceType(1) :- write('Selected normal piece'), nl.
readPieceType(2) :- write('Selected henge piece'), nl.
readPieceType(_) :- write('Wrong piece type, please try again!'), nl, !, fail.
	
%checks board
checkBoard(Board, Row, Col, CurrPlayer, Return) :-
	coords(Row), coords(Col), !,
	checkBoardSpot(Board, Row, Col), !,
	checkBoardSurroundings(Board, Row, Col, CurrPlayer, Return).
	
checkBoardSpot(Board, Row, Col) :-
	getPiece(Board, Row, Col, 0).

checkBoardSpot(_, _, _)	:- write('That coordinate is already occupied by a piece, try again!'), nl, !, fail.
	
checkBoardSurroundings(Board, 1, 1, CurrPlayer, Return) :- checkBoardTopLeft(Board, 1, 1, CurrPlayer, Return).
checkBoardSurroundings(Board, 5, 1, CurrPlayer, Return) :- checkBoardBotLeft(Board, 5, 1, CurrPlayer, Return).
checkBoardSurroundings(Board, 1, 5, CurrPlayer, Return) :- checkBoardTopRight(Board, 1, 5, CurrPlayer, Return).
checkBoardSurroundings(Board, 5, 5, CurrPlayer, Return) :- checkBoardBotRight(Board, 5, 5, CurrPlayer, Return).
checkBoardSurroundings(Board, 1, Col, CurrPlayer, Return) :- checkBoardTop(Board, 1, Col, CurrPlayer, Return).
checkBoardSurroundings(Board, 5, Col, CurrPlayer, Return) :- checkBoardBot(Board, 5, Col, CurrPlayer, Return).
checkBoardSurroundings(Board, Row, 5, CurrPlayer, Return) :- checkBoardRight(Board, Row, 5, CurrPlayer, Return).
checkBoardSurroundings(Board, Row, 1, CurrPlayer, Return) :- checkBoardLeft(Board, Row, 1, CurrPlayer, Return).
checkBoardSurroundings(Board, Row, Col, CurrPlayer, Return) :- checkBoardMiddle(Board, Row, Col, CurrPlayer, Return).

checkBoardMiddle(Board, Row, Col, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	Row > 1, Row < 5,
	Col > 1, Col < 5,
	
	ColRight is Col + 1,
	ColLeft is Col - 1,
	RowUp is Row + 1,
	RowDown is Row - 1, !,
	
	getPiece(Board, RowUp, Col, UpperPiece),
	getPiece(Board, RowDown, Col, BottomPiece),
	getPiece(Board, Row, ColLeft, LeftPiece),
	getPiece(Board, Row, ColRight, RightPiece),
	checkSurroundingPiecesMid(CurrPlayerPiece, UpperPiece, BottomPiece, LeftPiece, RightPiece, Return).
	
checkBoardLeft(Board, Row, 1, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	RowUp is Row + 1,
	RowDown is Row - 1, !,
	
	getPiece(Board, RowUp, 1, UpperPiece),
	getPiece(Board, RowDown, 1, BottomPiece),
	getPiece(Board, Row, 2, RightPiece),
	checkSurroundingPiecesSides(CurrPlayerPiece, UpperPiece, BottomPiece, RightPiece, Return).
	
checkBoardRight(Board, Row, 5, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	RowUp is Row + 1,
	RowDown is Row - 1, !,
	
	getPiece(Board, RowUp, 5, UpperPiece),
	getPiece(Board, RowDown, 5, BottomPiece),
	getPiece(Board, Row, 4, LeftPiece),
	checkSurroundingPiecesSides(CurrPlayerPiece, UpperPiece, BottomPiece, LeftPiece, Return).
	
checkBoardTop(Board, 1, Col, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	ColLeft is Col - 1,
	ColRight is Col + 1,
	
	getPiece(Board, 1, ColLeft, LeftPiece),
	getPiece(Board, 1, ColRight, RightPiece),
	getPiece(Board, 2, Col, BottomPiece),
	checkSurroundingPiecesSides(CurrPlayerPiece, LeftPiece, RightPiece, BottomPiece, Return).
	
checkBoardBot(Board, 5, Col, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	ColLeft is Col - 1,
	ColRight is Col + 1,
	
	getPiece(Board, 1, ColLeft, LeftPiece),
	getPiece(Board, 1, ColRight, RightPiece),
	getPiece(Board, 4, Col, TopPiece),
	checkSurroundingPiecesSides(CurrPlayerPiece, LeftPiece, RightPiece, TopPiece, Return).
	
checkBoardTopLeft(Board, 1, 1, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	getPiece(Board, 1, 2, RightPiece),
	getPiece(Board, 2, 1, BottomPiece),
	checkSurroundingPiecesCorner(CurrPlayerPiece, RightPiece, BottomPiece, Return).
	
checkBoardTopRight(Board, 1, 5, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	getPiece(Board, 1, 4, LeftPiece),
	getPiece(Board, 2, 5, BottomPiece),
	checkSurroundingPiecesCorner(CurrPlayerPiece, LeftPiece, BottomPiece, Return).
	
checkBoardBotLeft(Board, 5, 1, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	getPiece(Board, 5, 2, RightPiece),
	getPiece(Board, 4, 1, UpperPiece),
	checkSurroundingPiecesCorner(CurrPlayerPiece, RightPiece, UpperPiece, Return).
	
checkBoardBotRight(Board, 5, 5, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	getPiece(Board, 5, 4, LeftPiece),
	getPiece(Board, 4, 5, UpperPiece),
	checkSurroundingPiecesCorner(CurrPlayerPiece, LeftPiece, UpperPiece, Return).
	
getOpponentName('white', 'black').
getOpponentName('black', 'white').	
	
%selects which piece to play
selectPiece('white', 1, 2).
selectPiece('black', 1, 1).
selectPiece(_, 2, 3).
selectOppNormalPiece('white', 1).
selectOppNormalPiece('black', 2).

checkForEating(Board, Piece, Row, Col, BoardOut, PiecesEaten) :- Row =:= 1, Col =:= 1, checkForEatingTopLeft(Board, Piece, Row, Col, BoardOut, PiecesEaten).
checkForEating(Board, Piece, Row, Col, BoardOut, PiecesEaten) :- Row =:= 1, Col =:= 5, checkForEatingTopRight(Board, Piece, Row, Col, BoardOut, PiecesEaten).
checkForEating(Board, Piece, Row, Col, BoardOut, PiecesEaten) :- Row =:= 5, Col =:= 1, checkForEatingBotLeft(Board, Piece, Row, Col, BoardOut, PiecesEaten).
checkForEating(Board, Piece, Row, Col, BoardOut, PiecesEaten) :- Row =:= 5, Col =:= 5, checkForEatingBotRight(Board, Piece, Row, Col, BoardOut, PiecesEaten).
checkForEating(Board, Piece, Row, Col, BoardOut, PiecesEaten) :- Row =:= 1, checkForEatingTop(Board, Piece, Row, Col, BoardOut, PiecesEaten).
checkForEating(Board, Piece, Row, Col, BoardOut, PiecesEaten) :- Row =:= 5, checkForEatingBot(Board, Piece, Row, Col, BoardOut, PiecesEaten).
checkForEating(Board, Piece, Row, Col, BoardOut, PiecesEaten) :- Col =:= 1, checkForEatingLeft(Board, Piece, Row, Col, BoardOut, PiecesEaten).
checkForEating(Board, Piece, Row, Col, BoardOut, PiecesEaten) :- Col =:= 5, checkForEatingRight(Board, Piece, Row, Col, BoardOut, PiecesEaten).
checkForEating(Board, Piece, Row, Col, BoardOut, PiecesEaten) :- checkForEatingMiddle(Board, Piece, Row, Col, BoardOut, PiecesEaten).
	
checkForEatingTop(Board, Piece, Row, Col, BoardOut, PiecesEaten) :-
	ColLeft is Col - 1,
	ColRight is Col + 1,
	RowBot is Row + 1, !,
	
	getPiece(Board, Row, ColLeft, LeftPiece),
	getPiece(Board, Row, ColRight, RightPiece),
	getPiece(Board, RowBot, Col, BottomPiece),
	checkEatingPiecesSides(Board, Row, Col, Piece, LeftPiece, RightPiece, BottomPiece, BoardOut, PiecesEaten).
	
checkForEatingBot(Board, Piece, Row, Col, BoardOut, PiecesEaten) :-
	ColLeft is Col - 1,
	ColRight is Col + 1,
	RowUp is Row - 1, !,
	
	getPiece(Board, Row, ColLeft, LeftPiece),
	getPiece(Board, Row, ColRight, RightPiece),
	getPiece(Board, RowUp, Col, TopPiece),
	checkEatingPiecesSides(Board, Row, Col, Piece, LeftPiece, RightPiece, TopPiece, BoardOut, PiecesEaten).
	
checkForEatingLeft(Board, Piece, Row, Col, BoardOut, PiecesEaten) :-
	RowUp is Row + 1,
	RowDown is Row - 1,
	ColRight is Col + 1, !,
	
	getPiece(Board, RowUp, Col, UpperPiece),
	getPiece(Board, RowDown, Col, BottomPiece),
	getPiece(Board, Row, ColRight, RightPiece),
	checkEatingPiecesSides(Board, Row, Col, Piece, UpperPiece, BottomPiece, RightPiece, BoardOut, PiecesEaten).
	
checkForEatingRight(Board, Piece, Row, Col, BoardOut, PiecesEaten) :-
	RowUp is Row + 1,
	RowDown is Row - 1,
	ColLeft is Col - 1, !,
	
	getPiece(Board, RowUp, Col, UpperPiece),
	getPiece(Board, RowDown, Col, BottomPiece),
	getPiece(Board, Row, ColLeft, LeftPiece),
	checkEatingPiecesSides(Board, Row, Col, Piece, UpperPiece, BottomPiece, LeftPiece, BoardOut, PiecesEaten).

checkForEatingTopLeft(Board, Piece, Row, Col, BoardOut, PiecesEaten) :-
	ColRight is Col + 1,
	RowBot is Row + 1, !,

	getPiece(Board, Row, ColRight, RightPiece),
	getPiece(Board, RowBot, Col, BottomPiece),
	checkEatingPiecesCorner(Board, Row, Col, Piece, RightPiece, BottomPiece, BoardOut, PiecesEaten).
	
checkForEatingTopRight(Board, Piece, Row, Col, BoardOut, PiecesEaten) :-
	ColLeft is Col - 1,
	RowBot is Row + 1, !,

	getPiece(Board, Row, ColLeft, LeftPiece),
	getPiece(Board, RowBot, Col, BottomPiece),
	checkEatingPiecesCorner(Board, Row, Col, Piece, LeftPiece, BottomPiece, BoardOut, PiecesEaten).
	
checkForEatingBotLeft(Board, Piece, Row, Col, BoardOut, PiecesEaten) :-
	ColRight is Col + 1,
	RowUp is Row - 1, !,

	getPiece(Board, Row, ColRight, RightPiece),
	getPiece(Board, RowUp, Col, UpperPiece),
	checkEatingPiecesCorner(Board, Row, Col, Piece, RightPiece, UpperPiece, BoardOut, PiecesEaten).
	
checkForEatingBotRight(Board, Piece, Row, Col, BoardOut, PiecesEaten) :-
	ColLeft is Col - 1,
	RowUp is Row - 1, !,

	getPiece(Board, Row, ColLeft, LeftPiece),
	getPiece(Board, RowUp, Col, UpperPiece),
	checkEatingPiecesCorner(Board, Row, Col, Piece, LeftPiece, UpperPiece, BoardOut, PiecesEaten).
	
checkForEatingMiddle(Board, Piece, Row, Col, BoardOut, PiecesEaten) :-
	Row > 1, Row < 5,
	Col > 1, Col < 5,
	
	ColRight is Col + 1,
	ColLeft is Col - 1,
	RowUp is Row + 1,
	RowDown is Row - 1, !,
	
	getPiece(Board, RowUp, Col, UpperPiece),
	getPiece(Board, RowDown, Col, BottomPiece),
	getPiece(Board, Row, ColLeft, LeftPiece),
	getPiece(Board, Row, ColRight, RightPiece),
	checkEatingPiecesMiddle(Board, Row, Col, Piece, UpperPiece, BottomPiece, LeftPiece, RightPiece, BoardOut, PiecesEaten).
	
updateBoard(BoardIn, CurrPlayer, BoardOut, CurrPlayerOut) :-
	updateRow(BoardIn, CurrPlayer, BoardOut1, CurrPlayerOut1, 1),
	updateRow(BoardOut1, CurrPlayerOut1, BoardOut2, CurrPlayerOut2, 2),
	updateRow(BoardOut2, CurrPlayerOut2, BoardOut3, CurrPlayerOut3, 3),
	updateRow(BoardOut3, CurrPlayerOut3, BoardOut4, CurrPlayerOut4, 4),
	updateRow(BoardOut4, CurrPlayerOut4, BoardOut, CurrPlayerOut, 5).
	
updateRow(BoardIn, CurrPlayer, BoardOut, CurrPlayerOut, Row) :-
	getPiece(BoardIn, Row, 1, Piece1),
	getPiece(BoardIn, Row, 2, Piece2),
	getPiece(BoardIn, Row, 3, Piece3),
	getPiece(BoardIn, Row, 4, Piece4),
	getPiece(BoardIn, Row, 5, Piece5),
	checkForEating(BoardIn, Piece1, Row, 1, BoardOut1, PiecesEaten1),
	checkForEating(BoardOut1, Piece2, Row, 2, BoardOut2, PiecesEaten2),
	checkForEating(BoardOut2, Piece3, Row, 3, BoardOut3, PiecesEaten3),
	checkForEating(BoardOut3, Piece4, Row, 4, BoardOut4, PiecesEaten4),
	checkForEating(BoardOut4, Piece5, Row, 5, BoardOut, PiecesEaten5),
	PiecesEaten is PiecesEaten1 + PiecesEaten2 + PiecesEaten3 + PiecesEaten4 + PiecesEaten5,
	nth1(5, CurrPlayer, PlayerScore),
	NewPlayerScore is PlayerScore + PiecesEaten,
	updatePlayer(CurrPlayer, 5, NewPlayerScore, CurrPlayerOut).
	
checkPlays(Board, Row, Col, CurrPlayer, Return) :-
	coords(Row), coords(Col),
	checkPlaysSpot(Board, Row, Col, Return),
	checkPlaysSurroundings(Board, Row, Col, CurrPlayer, Return).
	
checkPlaysSpot(Board, Row, Col, 1) :-
	getPiece(Board, Row, Col, 0).

checkPlaysSpot(_, _, _, 0) :- write('That coordinate is already occupied by a piece, try again!'), nl.
	
checkPlaysSurroundings(Board, 1, 1, CurrPlayer, Return) :- checkPlaysTopLeft(Board, 1, 1, CurrPlayer, Return).
checkPlaysSurroundings(Board, 5, 1, CurrPlayer, Return) :- checkPlaysBotLeft(Board, 5, 1, CurrPlayer, Return).
checkPlaysSurroundings(Board, 1, 5, CurrPlayer, Return) :- checkPlaysTopRight(Board, 1, 5, CurrPlayer, Return).
checkPlaysSurroundings(Board, 5, 5, CurrPlayer, Return) :- checkPlaysBotRight(Board, 5, 5, CurrPlayer, Return).
checkPlaysSurroundings(Board, 1, Col, CurrPlayer, Return) :- checkPlaysTop(Board, 1, Col, CurrPlayer, Return).
checkPlaysSurroundings(Board, 5, Col, CurrPlayer, Return) :- checkPlaysBot(Board, 5, Col, CurrPlayer, Return).
checkPlaysSurroundings(Board, Row, 5, CurrPlayer, Return) :- checkPlaysRight(Board, Row, 5, CurrPlayer, Return).
checkPlaysSurroundings(Board, Row, 1, CurrPlayer, Return) :- checkPlaysLeft(Board, Row, 1, CurrPlayer, Return).
checkPlaysSurroundings(Board, Row, Col, CurrPlayer, Return) :- checkPlaysMiddle(Board, Row, Col, CurrPlayer, Return).

checkPlaysMiddle(Board, Row, Col, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	Row > 1, Row < 5,
	Col > 1, Col < 5,
	
	ColRight is Col + 1,
	ColLeft is Col - 1,
	RowUp is Row + 1,
	RowDown is Row - 1, !,
	
	getPiece(Board, RowUp, Col, UpperPiece),
	getPiece(Board, RowDown, Col, BottomPiece),
	getPiece(Board, Row, ColLeft, LeftPiece),
	getPiece(Board, Row, ColRight, RightPiece),
	checkPlaysSurroundingPiecesMid(CurrPlayerPiece, UpperPiece, BottomPiece, LeftPiece, RightPiece, Return).
	
checkPlaysLeft(Board, Row, 1, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	RowUp is Row + 1,
	RowDown is Row - 1, !,
	
	getPiece(Board, RowUp, 1, UpperPiece),
	getPiece(Board, RowDown, 1, BottomPiece),
	getPiece(Board, Row, 2, RightPiece),
	checkPlaysSurroundingPiecesSides(CurrPlayerPiece, UpperPiece, BottomPiece, RightPiece, Return).
	
checkPlaysRight(Board, Row, 5, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	RowUp is Row + 1,
	RowDown is Row - 1, !,
	
	getPiece(Board, RowUp, 5, UpperPiece),
	getPiece(Board, RowDown, 5, BottomPiece),
	getPiece(Board, Row, 4, LeftPiece),
	checkPlaysSurroundingPiecesSides(CurrPlayerPiece, UpperPiece, BottomPiece, LeftPiece, Return).
	
checkPlaysTop(Board, 1, Col, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	ColLeft is Col - 1,
	ColRight is Col + 1,
	
	getPiece(Board, 1, ColLeft, LeftPiece),
	getPiece(Board, 1, ColRight, RightPiece),
	getPiece(Board, 2, Col, BottomPiece),
	checkPlaysSurroundingPiecesSides(CurrPlayerPiece, LeftPiece, RightPiece, BottomPiece, Return).
	
checkPlaysBot(Board, 5, Col, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	ColLeft is Col - 1,
	ColRight is Col + 1,
	
	getPiece(Board, 1, ColLeft, LeftPiece),
	getPiece(Board, 1, ColRight, RightPiece),
	getPiece(Board, 4, Col, TopPiece),
	checkPlaysSurroundingPiecesSides(CurrPlayerPiece, LeftPiece, RightPiece, TopPiece, Return).
	
checkPlaysTopLeft(Board, 1, 1, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	getPiece(Board, 1, 2, RightPiece),
	getPiece(Board, 2, 1, BottomPiece),
	write('Player piece: '), write(CurrPlayerPiece), write(', Right piece: '), write(RightPiece), write(', Bot piece: '), write(BottomPiece), nl,
	checkPlaysSurroundingPiecesCorner(CurrPlayerPiece, RightPiece, BottomPiece, Return).
	
checkPlaysTopRight(Board, 1, 5, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	getPiece(Board, 1, 4, LeftPiece),
	getPiece(Board, 2, 5, BottomPiece),
	checkPlaysSurroundingPiecesCorner(CurrPlayerPiece, LeftPiece, BottomPiece, Return).
	
checkPlaysBotLeft(Board, 5, 1, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	getPiece(Board, 5, 2, RightPiece),
	getPiece(Board, 4, 1, UpperPiece),
	checkPlaysSurroundingPiecesCorner(CurrPlayerPiece, RightPiece, UpperPiece, Return).
	
checkPlaysBotRight(Board, 5, 5, CurrPlayer, Return) :-
	nth1(1, CurrPlayer, PlayerName),
	selectPiece(PlayerName, 1, CurrPlayerPiece),
	
	getPiece(Board, 5, 4, LeftPiece),
	getPiece(Board, 4, 5, UpperPiece),
	checkPlaysSurroundingPiecesCorner(CurrPlayerPiece, LeftPiece, UpperPiece, Return).

%removes a piece from player, base case
%removePieceFromPlayer([_, 0, _, _, _], _, _) :- mainMenu.

%removes normal piece from player
removePieceFromPlayer(Player, 1, PlayerOut) :- removeNormalPieceFromPlayer(Player, PlayerOut).

%removes henge piece from player
removePieceFromPlayer(Player, 2, PlayerOut) :- removeHengePieceFromPlayer(Player, PlayerOut).

removeNormalPieceFromPlayer(Player, PlayerOut) :-
	nth1(2, Player, NormalAmount),
	NewNormalAmount is NormalAmount - 1,
	updatePlayer(Player, 2, NewNormalAmount, PlayerOut).
	
removeHengePieceFromPlayer([_, _, 0, _, _], _) :- write('No henge pieces available!'), nl, !, fail.
	
removeHengePieceFromPlayer(Player, PlayerOut) :-
	nth1(3, Player, HengeAmount),
	NewHengeAmount is HengeAmount - 1,
	updatePlayer(Player, 3, NewHengeAmount, PlayerOut).
	
removePieceFromBoard(Board, Row, Col, BoardOut) :- 
	setPiece(Board, Row, Col, 0, BoardOut).

%updates a value in player list, base case
updatePlayer([_|T], 1, NewValue, [NewValue|T]).

%updates a value in player list, recursive case
updatePlayer([H|T], Index, NewValue, [H|R]) :-
	Index > 1,
	Index1 is Index - 1,
	updatePlayer(T, Index1, NewValue, R).
	
%checks who's turn it is, printing it
checkTurn(Counter, Player1, Player2, CurrPlayer) :-
	TurnAux is Counter mod 2,
	checkTurnAux(TurnAux, Player1, Player2, CurrPlayer).
	
checkTurnAux(0, Player1, _, CurrPlayer) :- CurrPlayer = Player1, write('White pieces turn.'), nl.
checkTurnAux(1, _, Player2, CurrPlayer) :- CurrPlayer = Player2, write('Black pieces turn.'), nl.
		
%checks if a coordinate is within board bounds
coords(1).
coords(2).
coords(3).
coords(4).
coords(5).

%checks if a number is between 1 and 5
checkNumberBounds(Number) :- Number > 0, Number =< 5.
checkNumberBounds(_) :- write('That coordinate is out of bounds, try again!'), nl, !, fail.

%gets a piece from the board, given coordinates	
getPiece(Board, Row, Col, Val) :-  
	nth1(Row, Board, ARow), 
	nth1(Col, ARow, Val).

%prints the info about which piece was asked for	
printPieceInfo(0) :- write('That tile is empty.').
printPieceInfo(1) :- write('That tile is occupied by a Black piece.').
printPieceInfo(2) :- write('That tile is occupied by a White piece.').
printPieceInfo(3) :- write('That tile is occupied by a Henge piece.').
printPieceInfo(_) :- write('Error'), nl, !, fail.

%setPiece
setPiece([L|Ls], 1, Y, Value, [R|Ls]) :- setPieceAux(L, Y, Value, R).

setPiece([L|Ls], X, Y, Value, [L|Rs]) :-
	X > 1,
	X1 is X - 1,
	setPiece(Ls, X1, Y, Value, Rs).
	
setPieceAux([_|Cs], 1, Value, [Value|Cs]).

setPieceAux([C|Cs], Y, Value, [C|Rs]) :-
	Y > 1,
	Y1 is Y - 1,
	setPieceAux(Cs, Y1, Value, Rs).

%teste
teste :-
	testBoard(Board),
	printBoard(Board),
	get_code(_).