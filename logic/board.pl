:- use_module(library(lists)).

% '0' significa espaco vazio.
% '1' significa peca preta.
% '2' significa peca branca.
% '3' significa peca henge.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%GAME BOARDS AND SOME EXAMPLES%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%Fresh Board.
freshBoard([[0, 0, 0, 0, 0],
		    [0, 0, 0, 0, 0],
		    [0, 0, 0, 0, 0],
		    [0, 0, 0, 0, 0],
		    [0, 0, 0, 0, 0]]).

%Early game board example.			
earlyGameBoard([[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 3, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]]).
	
%Mid game board example.	
midGameBoard([[1, 2, 0, 0, 0],
			  [0, 1, 0, 0, 1],
		      [0, 3, 2, 2, 1],
		      [0, 0, 1, 0, 2],
		      [0, 0, 0, 0, 0]]).
		
%End game board example.		
endGameBoard([[1, 0, 1, 0, 3],
			  [0, 1, 0, 3, 0],
		      [0, 3, 0, 0, 0],
		      [0, 0, 0, 0, 0],
		      [3, 0, 3, 0, 0]]).
			  
testBoard([[2, 2, 2, 2, 2],
		   [2, 0, 2, 2, 2],
		   [2, 2, 2, 2, 2],
		   [2, 2, 2, 2, 2],
		   [2, 2, 2, 2, 2]]).
			  
%%%%%%%%%%%%%%%%%%%%
%PRINTING FUNCTIONS%
%%%%%%%%%%%%%%%%%%%%
			  
%Prints the board's horizontal line.			
printBoardLine :- write('|-----------------------|'),
				  nl.

%Prints the vertical space on the top of the board.				  
printBoardTopAux :- nl,
					write('    |   |   |   |   |   |'),
				    nl.

%Prints the top of the board.					
printBoardTop :- nl,
				 printBoardLine,
				 printRowLimit,
				 write('|   | A | B | C | D | E |'), 
				 nl,
				 printRowLimit.

%Prints the vertical space between board lines.
printRowLimit :- write('|   |   |   |   |   |   |'),
			     nl.				 

%Prints a row of information.				 
printRow([L|Ls]) :- readSymbol(L, X),
					write(X),
					write(' | '),
					printRow(Ls).

%Prints an empty list.					
printRow([]) :- nl,
				printBoardLine.

%Prints an empty board.
printBoard([], _) :- nl.

%Prints the board's information.
printBoard([L|Ls], LineN) :-
			   write('| '),
			   write(LineN),
			   write(' | '),
			   printRow(L),
			   LN is LineN+1,
			   printBoard(Ls, LN).

%%%%%%%%%%%%%%%%%%%			   
%PRINT GAME BOARDS%
%%%%%%%%%%%%%%%%%%%

%Prints an entire fresh Board.			   
printBoard :- %freshBoard(X),
			  midGameBoard(X),
			  printBoardTop,
			  printBoardLine,
			  printBoard(X, 1).
			  
printBoard(Board) :- printBoardTop,
			  printBoardLine,
			  printBoard(Board, 1).
			  
%Prints the early game Board.			  
printEarlyBoard :- earlyGameBoard(X),
				   printBoardTop,
				   printBoardLine,
				   printBoard(X, 1).

%Prints the mid game Board.			  
printMidBoard :- midGameBoard(X),
				 printBoardTop,
				 printBoardLine,
				 printBoard(X, 1).

%Prints the end game Board.					 
printEndBoard :- endGameBoard(X),
				 printBoardTop,
				 printBoardLine,
				 printBoard(X, 1).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%FUNCTIONS TO PRINT INFO CORRECTLY%	
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
		 
readSymbol(0, ' ').
readSymbol(1, 'B').
readSymbol(2, 'W').
readSymbol(3, '*').