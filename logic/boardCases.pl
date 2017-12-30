%%%%%%%%%%%%%%% CHECKING PLAYS FOR ERROR MESSAGES %%%%%%%%%%%%%%%%%%

checkSurroundingPiecesMid(1, 2, 2, 2, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 3, 2, 2, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 2, 3, 2, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 2, 2, 3, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 2, 2, 2, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 3, 3, 2, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 3, 2, 3, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 3, 2, 2, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 2, 3, 2, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 2, 2, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 2, 3, 3, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 3, 3, 3, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 3, 3, 2, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 3, 2, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 2, 3, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, 3, 3, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesMid(1, _, _, _, _, Return) :- Return is 1, write('Successful black play!'), nl.
checkSurroundingPiecesMid(2, 1, 1, 1, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 3, 1, 1, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 1, 3, 1, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 1, 1, 3, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 1, 1, 1, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 3, 3, 1, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 3, 1, 3, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 3, 1, 1, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 1, 3, 1, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 1, 1, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 1, 3, 3, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 3, 3, 3, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 3, 3, 1, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 1, 3, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 3, 1, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, 3, 3, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesMid(2, _, _, _, _, Return) :- Return is 1, write('Successful white play!'), nl.
checkSurroundingPiecesMid(3, _, _, _, _, Return) :- Return is 1, write('Successfully placed henge piece!'), nl.

checkSurroundingPiecesSides(1, 2, 2, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesSides(1, 3, 2, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesSides(1, 2, 3, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesSides(1, 2, 2, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesSides(1, 3, 3, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesSides(1, 3, 2, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesSides(1, 2, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesSides(1, 3, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesSides(1, _, _, _, Return) :- Return is 1, write('Successful black play!'), nl.
checkSurroundingPiecesSides(2, 1, 1, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesSides(2, 3, 1, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesSides(2, 1, 3, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesSides(2, 1, 1, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesSides(2, 3, 3, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesSides(2, 3, 1, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesSides(2, 1, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesSides(2, 3, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesSides(2, _, _, _, Return) :- Return is 1, write('Successful white play!'), nl.
checkSurroundingPiecesSides(3, _, _, _, Return) :- Return is 1, write('Successfully placed henge piece!'), nl.


checkSurroundingPiecesCorner(1, 2, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesCorner(1, 3, 2, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesCorner(1, 2, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesCorner(1, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by white pieces!'), nl, !.
checkSurroundingPiecesCorner(1, _, _, Return) :- Return is 1, write('Successful black play!'), nl.
checkSurroundingPiecesCorner(2, 1, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesCorner(2, 3, 1, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesCorner(2, 1, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesCorner(2, 3, 3, Return) :- Return is 0, write('That coordinate is surrounded by black pieces!'), nl, !.
checkSurroundingPiecesCorner(2, _, _, Return) :- Return is 1, write('Successful white play!'), nl.
checkSurroundingPiecesCorner(3, _, _, Return) :- Return is 1, write('Successfully placed henge piece!'), nl.

%%%%%%%%%%%%%%% CHECKING EATING PIECES %%%%%%%%%%%%%%%%%%
checkEatingPiecesMiddle(Board, Row, Col, 1, 2, 2, 2, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 3, 2, 2, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 2, 3, 2, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 2, 2, 3, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 2, 2, 2, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 3, 3, 2, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 3, 2, 3, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 3, 2, 2, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 2, 3, 2, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 2, 2, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 2, 3, 3, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 3, 3, 3, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 3, 3, 2, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 3, 2, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 2, 3, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 1, 3, 3, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 1, 1, 1, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 3, 1, 1, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 1, 3, 1, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 1, 1, 3, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 1, 1, 1, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 3, 3, 1, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 3, 1, 3, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 3, 1, 1, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 1, 3, 1, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 1, 1, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 1, 3, 3, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 3, 3, 3, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 3, 3, 1, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 3, 1, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 1, 3, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, Row, Col, 2, 3, 3, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesMiddle(Board, _, _, _, _, _, _, _, BoardOut, PiecesEaten) :- PiecesEaten is 0, BoardOut = Board, write('Piece not eaten.'), nl, !.

checkEatingPiecesSides(Board, Row, Col, 1, 2, 2, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 1, 3, 2, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 1, 2, 3, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 1, 2, 2, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 1, 3, 3, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 1, 3, 2, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 1, 2, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 1, 3, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 2, 1, 1, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 2, 3, 1, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 2, 1, 3, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 2, 1, 1, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 2, 3, 3, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 2, 3, 1, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 2, 1, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, Row, Col, 2, 3, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesSides(Board, _, _, _, _, _, _, BoardOut, PiecesEaten) :- PiecesEaten is 0, BoardOut = Board, write('Piece not eaten.'), nl, !.

checkEatingPiecesCorner(Board, Row, Col, 1, 2, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesCorner(Board, Row, Col, 1, 3, 2, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesCorner(Board, Row, Col, 1, 2, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesCorner(Board, Row, Col, 1, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesCorner(Board, Row, Col, 2, 1, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesCorner(Board, Row, Col, 2, 3, 1, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesCorner(Board, Row, Col, 2, 1, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesCorner(Board, Row, Col, 2, 3, 3, BoardOut, PiecesEaten) :- PiecesEaten is 1, write('Piece is getting eaten.'), nl, removePieceFromBoard(Board, Row, Col, BoardOut), !.
checkEatingPiecesCorner(Board, _, _, _, _, _, BoardOut, PiecesEaten) :- PiecesEaten is 0, BoardOut = Board, write('Piece not eaten.'), nl, !.