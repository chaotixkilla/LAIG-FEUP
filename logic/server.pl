:-use_module(library(sockets)).
:-use_module(library(lists)).
:-use_module(library(codesio)).

:-include('game.pl').

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                        Server                                                   %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% To run, enter 'server.' on sicstus command line after consulting this file.
% You can test requests to this server by going to http://localhost:8081/<request>.
% Go to http://localhost:8081/quit to close server.

% Made by Luis Reis (ei12085@fe.up.pt) for LAIG course at FEUP.

port(8081).

% Server Entry Point
server :-
	port(Port),
	write('Opened Server'),nl,nl,
	socket_server_open(Port, Socket),
	server_loop(Socket),
	socket_server_close(Socket),
	write('Closed Server'),nl.

% Server Loop
% Uncomment writes for more information on incomming connections
server_loop(Socket) :-
	repeat,
	socket_server_accept(Socket, _Client, Stream, [type(text)]),
		% write('Accepted connection'), nl,
	    % Parse Request
		catch((
			read_request(Stream, Request),
			read_header(Stream)
		),_Exception,(
			% write('Error parsing request.'),nl,
			close_stream(Stream),
			fail
		)),

		% Generate Response
		handle_request(Request, MyReply, Status),
		format('Request: ~q~n',[Request]),
		format('Reply: ~q~n', [MyReply]),

		% Output Response
		format(Stream, 'HTTP/1.0 ~p~n', [Status]),
		format(Stream, 'Access-Control-Allow-Origin: *~n', []),
		format(Stream, 'Content-Type: text/plain~n~n', []),
		format(Stream, '~p', [MyReply]),

		% write('Finnished Connection'),nl,nl,
		close_stream(Stream),
	(Request = quit), !.

close_stream(Stream) :- flush_output(Stream), close(Stream).

% Handles parsed HTTP requests
% Returns 200 OK on successful aplication of parse_input on request
% Returns 400 Bad Request on syntax error (received from parser) or on failure of parse_input
handle_request(Request, MyReply, '200 OK') :- catch(parse_input(Request, MyReply),error(_,_),fail), !.
handle_request(syntax_error, 'Syntax Error', '400 Bad Request') :- !.
handle_request(_, 'Bad Request', '400 Bad Request').

% Reads first Line of HTTP Header and parses request
% Returns term parsed from Request-URI
% Returns syntax_error in case of failure in parsing
read_request(Stream, Request) :-
	read_line(Stream, LineCodes),
	print_header_line(LineCodes),

	% Parse Request
	atom_codes('GET /',Get),
	append(Get,RL,LineCodes),
	read_request_aux(RL,RL2),

	catch(read_from_codes(RL2, Request), error(syntax_error(_),_), fail), !.
read_request(_,syntax_error).

read_request_aux([32|_],[46]) :- !.
read_request_aux([C|Cs],[C|RCs]) :- read_request_aux(Cs, RCs).


% Reads and Ignores the rest of the lines of the HTTP Header
read_header(Stream) :-
	repeat,
	read_line(Stream, Line),
	print_header_line(Line),
	(Line = []; Line = end_of_file),!.

check_end_of_header([]) :- !, fail.
check_end_of_header(end_of_file) :- !,fail.
check_end_of_header(_).

% Function to Output Request Lines (uncomment the line bellow to see more information on received HTTP Requests)
% print_header_line(LineCodes) :- catch((atom_codes(Line,LineCodes),write(Line),nl),_,fail), !.
print_header_line(_).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                       Commands                                                  %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Require your Prolog Files here

parse_input(handshake, handshake).
parse_input(test(C,N), Res) :- test(C,Res,N).
parse_input(quit, goodbye).
test(_,[],N) :- N =< 0.
test(A,[A|Bs],N) :- N1 is N-1, test(A,Bs,N1).

parse_input(getFreshBoard, Return) :-
	freshBoard(Return).


parse_input(startGamePVP) :-
	startGamePVP.

parse_input(askPlay(BoardIn, [Name, Pieces, HengePieces, bot, Score]), BoardOut) :-
	askPlay(BoardIn, [Name, Pieces, HengePieces, bot, Score], BoardOut, [NameOut, PiecesOut, HengePiecesOut, bot, ScoreOut]).

parse_input(checkBoardSurroundings(BoardIn, Row, Col, CurrPlayer), Return) :-
	checkBoardSurroundings(BoardIn, Row, Col, CurrPlayer, Return).


%Martirio para fazer checkBoardSurroundings
parse_input(checkSurroundingPiecesMid(CurrPlayerPiece, UpperPiece, BottomPiece, LeftPiece, RightPiece), Return):-
	checkSurroundingPiecesMid(CurrPlayerPiece, UpperPiece, BottomPiece, LeftPiece, RightPiece, Return).

parse_input(checkSurroundingPiecesSides(CurrPlayerPiece, UpperPiece, BottomPiece, RightPiece), Return):-
		checkSurroundingPiecesSides(CurrPlayerPiece, UpperPiece, BottomPiece, RightPiece, Return).
	
parse_input(checkSurroundingPiecesCorner(CurrPlayerPiece, RightPiece, BottomPiece), Return):-
	checkSurroundingPiecesCorner(CurrPlayerPiece, RightPiece, BottomPiece, Return).

parse_input(checkEatingPiecesMiddle(Board, Row, Col, Piece, UpperPiece, BottomPiece, LeftPiece, RightPiece), PiecesEaten):-
	checkEatingPiecesMiddle(Board, Row, Col, Piece, UpperPiece, BottomPiece, LeftPiece, RightPiece, BoardOut, PiecesEaten).

parse_input(checkEatingPiecesSides(Board, Row, Col, Piece, LeftPiece, RightPiece, BottomPiece), PiecesEaten):-
	checkEatingPiecesSides(Board, Row, Col, Piece, LeftPiece, RightPiece, BottomPiece, BoardOut, PiecesEaten).

parse_input(checkEatingPiecesCorner(Board, Row, Col, Piece, RightPiece, BottomPiece), PiecesEaten):-
	checkEatingPiecesCorner(Board, Row, Col, Piece, RightPiece, BottomPiece, BoardOut, PiecesEaten).
	
parse_input(checkBoard(Board, Row, Col, CurrPlayer), Return) :-
	checkBoard(Board, Row, Col, CurrPlayer, Return).


%gameLoop(Board, -1, [Name1, Pieces1, HengePieces1, human, Score1], [Name2, Pieces2, HengePieces2, PlayerType2, Score2])
parse_input(checkGameOver(Board, -1, [Name1, Pieces1, HengePieces1, human, Score1], [Name2, Pieces2, HengePieces2, PlayerType2, Score2]), Return) :-
	gameLoop(Board, -1, [Name1, Pieces1, HengePieces1, human, Score1], [Name2, Pieces2, HengePieces2, PlayerType2, Score2]).
