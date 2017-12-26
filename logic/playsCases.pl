%%%%%%%%%%%%%%% CHECKING PLAYS (HARDCODED DUE TO BUGGY BEHAVIOUR - ALREADY TRIED WITH CUTS, CUTS + FAIL, CUTS ON THE FUNCTION CALL AND STILL BUGGY) %%%%%%%%%%%%%%%%%%
%%% BLACK %%%
checkPlaysSurroundingPiecesMid(1, 2, 2, 2, 2, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 3, 2, 2, 2, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 2, 3, 2, 2, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 2, 2, 3, 2, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 2, 2, 2, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 3, 3, 2, 2, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 3, 2, 3, 2, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 3, 2, 2, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 2, 3, 2, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 2, 2, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 2, 3, 3, 2, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 3, 3, 3, 2, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 3, 3, 2, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 3, 2, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 2, 3, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(1, 3, 3, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(1, _, _, _, _, 1) :- !.

%%% WHITE %%%
checkPlaysSurroundingPiecesMid(2, 1, 1, 1, 1, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 3, 1, 1, 1, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 1, 3, 1, 1, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 1, 1, 3, 1, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 1, 1, 1, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 3, 3, 1, 1, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 3, 1, 3, 1, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 3, 1, 1, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 1, 3, 1, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 1, 1, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 1, 3, 3, 1, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 3, 3, 3, 1, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 3, 3, 1, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 1, 3, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 3, 1, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(2, 3, 3, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesMid(2, _, _, _, _, 1) :- !.
checkPlaysSurroundingPiecesMid(3, _, _, _, _, 1) :- !.

%%% BLACK %%%
checkPlaysSurroundingPiecesSides(1, 2, 2, 2, 0) :- !.
checkPlaysSurroundingPiecesSides(1, 3, 2, 2, 0) :- !.
checkPlaysSurroundingPiecesSides(1, 2, 3, 2, 0) :- !.
checkPlaysSurroundingPiecesSides(1, 2, 2, 3, 0) :- !.
checkPlaysSurroundingPiecesSides(1, 3, 3, 2, 0) :- !.
checkPlaysSurroundingPiecesSides(1, 3, 2, 3, 0) :- !.
checkPlaysSurroundingPiecesSides(1, 2, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesSides(1, 3, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesSides(1, _, _, _, 1) :- !.

%%% WHITE %%%
checkPlaysSurroundingPiecesSides(2, 1, 1, 1, 0) :- !.
checkPlaysSurroundingPiecesSides(2, 3, 1, 1, 0) :- !.
checkPlaysSurroundingPiecesSides(2, 1, 3, 1, 0) :- !.
checkPlaysSurroundingPiecesSides(2, 1, 1, 3, 0) :- !.
checkPlaysSurroundingPiecesSides(2, 3, 3, 1, 0) :- !.
checkPlaysSurroundingPiecesSides(2, 3, 1, 3, 0) :- !.
checkPlaysSurroundingPiecesSides(2, 1, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesSides(2, 3, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesSides(2, _, _, _, 1) :- !.
checkPlaysSurroundingPiecesSides(3, _, _, _, 1) :- !.

%%%%%%%%%%%%%% CHECKPLAYS CORNERS (HARDCODED DUE TO SOME BUG) %%%%%%%%%%%%%%%%%%%
%%% BLACK %%%
checkPlaysSurroundingPiecesCorner(1, 2, 2, 0) :- !.
checkPlaysSurroundingPiecesCorner(1, 3, 2, 0) :- !.
checkPlaysSurroundingPiecesCorner(1, 2, 3, 0) :- !.
checkPlaysSurroundingPiecesCorner(1, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesCorner(1, _, _, 1) :- !.

%%% WHITE %%%
checkPlaysSurroundingPiecesCorner(2, 1, 1, 0) :- !.
checkPlaysSurroundingPiecesCorner(2, 3, 1, 0) :- !.
checkPlaysSurroundingPiecesCorner(2, 1, 3, 0) :- !.
checkPlaysSurroundingPiecesCorner(2, 3, 3, 0) :- !.
checkPlaysSurroundingPiecesCorner(2, _, _, 1) :- !.