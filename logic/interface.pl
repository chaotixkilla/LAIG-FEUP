%%%%%%%%%%%
%INTERFACE%
%%%%%%%%%%%

clearScreen :- write('\33\[2J').

mainMenuScreen :- 
clearScreen,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                          Go-Ro-Go                            ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                                                              ||'), nl,
write('||                                                              ||'), nl,
write('||                        1. Play                               ||'), nl,
write('||                        2. How To Play                        ||'), nl,
write('||                        3. About                              ||'), nl,
write('||                        4. Exit                               ||'), nl,
write('||                                                              ||'), nl,
write('||                                                              ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl.

mainMenu :-
clearScreen,
mainMenuScreen,
read(Option),
(
	Option =:= 1 -> playMenu;
	Option =:= 2 -> howToPlayMenu;
	Option =:= 3 -> aboutMenu;
	Option =:= 4;
	
	mainMenu
).

playMenuScreen :-
clearScreen,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                          Go-Ro-Go                            ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                                                              ||'), nl,
write('||                        Select Mode                           ||'), nl,
write('||                                                              ||'), nl,
write('||                    1. Human vs Human                         ||'), nl,
write('||                    2. Human vs Computer                      ||'), nl,
write('||                    3. Computer vs Computer                   ||'), nl,
write('||                    4. Back to Main Menu                      ||'), nl,
write('||                                                              ||'), nl,
write('||                                                              ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl.

playMenu :-
clearScreen,
playMenuScreen,
read(Option),
(
	Option =:= 1 -> startGamePvP;
	Option =:= 2 -> botDifficultyMenu;
	Option =:= 3 -> botDifficultyMenu2;
	Option =:= 4 -> mainMenu;
	
	playMenu
).

botDifficultyScreen :-
clearScreen,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                          Go-Ro-Go                            ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                                                              ||'), nl,
write('||                     Select Difficulty                        ||'), nl,
write('||                                                              ||'), nl,
write('||                    1. Easy                                   ||'), nl,
write('||                    2. Hard                                   ||'), nl,
write('||                    3. Difficulty Info                        ||'), nl,
write('||                    4. Back to Mode Menu                      ||'), nl,
write('||                                                              ||'), nl,
write('||                                                              ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl.

botDifficultyMenu :-
clearScreen,
botDifficultyScreen,
read(Option),
(
	Option =:= 1 -> selectPlayerMenu;
	Option =:= 2 -> selectPlayerMenu;
	Option =:= 3 -> difficultyMenu;
	Option =:= 4 -> playMenu;
	
	botDifficultyMenu
).

botDifficultyMenu2 :-
clearScreen,
botDifficultyScreen,
read(Option),
(
	Option =:= 1 -> startGameEvE;
	Option =:= 2 -> startGameEvE;
	Option =:= 3 -> difficultyMenu;
	Option =:= 4 -> playMenu;
	
	botDifficultyMenu
).

selectPlayerScreen :-
clearScreen,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                          Go-Ro-Go                            ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                                                              ||'), nl,
write('||                    Select Your Piece Color                   ||'), nl,
write('||                                                              ||'), nl,
write('||                    1. Black                                  ||'), nl,
write('||                    2. White                                  ||'), nl,
write('||                    3. Back to Play Menu                      ||'), nl,
write('||                                                              ||'), nl,
write('||                                                              ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl.

selectPlayerMenu :-
clearScreen,
selectPlayerScreen,
read(Option),
(
	Option =:= 1 -> startGamePvE(black);
	Option =:= 2 -> startGamePvE(white);
	Option =:= 3 -> playMenu;
	
	selectPlayerMenu
).

difficultyScreen :-
clearScreen,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                          Go-Ro-Go                              ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                                                                ||'), nl,
write('||                        Difficulty Info                         ||'), nl,
write('||                                                                ||'), nl,
write('||  You can assign two different difficulties to the computer:    ||'), nl,
write('||                                                                ||'), nl,
write('||  Easy: All plays made by the computer are random valid ones.   ||'), nl,
write('||  Hard: PC uses a greedy algorithm for the best available play. ||'), nl,
write('||                                                                ||'), nl,
write('||                  1. Back to Difficulty Selection               ||'), nl,
write('||                                                                ||'), nl,
write('||                                                                ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl.

difficultyMenu :-
clearScreen,
difficultyScreen,
read(Option),
(
	Option =:= 1 -> botDifficultyMenu;
	
	difficultyMenu
).


howToPlayScreen :-
clearScreen,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                          Go-Ro-Go                              ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                                                                ||'), nl,
write('||                         How to play                            ||'), nl,
write('||                                                                ||'), nl,
write('|| The game is played with 25 pieces: 10 whites, 10 blacks and 5  ||'), nl,
write('|| Henge. Henge pieces take the color of the pieces of the player ||'), nl,
write('|| that is currently playing. Whites make the first move: put the ||'), nl,
write('|| first Henge piece on the board. The player that eats the most  ||'), nl,
write('|| enemy pieces wins. If a player has no valid moves, he loses.   ||'), nl,
write('||                                                                ||'), nl,
write('||                  1. Back to Main Menu                          ||'), nl,
write('||                                                                ||'), nl,
write('||                                                                ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl.

howToPlayMenu :-
clearScreen,
howToPlayScreen,
read(Option),
(
	Option =:= 1 -> mainMenu;
	
	howToPlayMenu
).


aboutScreen :-
clearScreen,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                          Go-Ro-Go                              ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                                                                ||'), nl,
write('||                            About                               ||'), nl,
write('||                                                                ||'), nl,
write('||  A simplified game of Go featuring Henge pieces (pronounced)   ||'), nl,
write('||  "Han-gay". Tested in the Tokyo Game Market in December, 2016  ||'), nl,
write('||                      to universal aclaim.                      ||'), nl,
write('||                                                                ||'), nl,
write('||                   Original game by Doug Masiel                 ||'), nl,
write('||                                                                ||'), nl,
write('||                      1. Back to Main Menu                      ||'), nl,
write('||                                                                ||'), nl,
write('||                                                                ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl.

aboutMenu :-
clearScreen,
aboutScreen,
read(Option),
(
	Option =:= 1 -> mainMenu;
	
	aboutMenu
).

gameOverScreen(Winner, Reason) :-
clearScreen,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                          Go-Ro-Go                              ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl,
write('||                                                                ||'), nl,
write('||                       End of the game!                         ||'), nl,
write('||                                                                ||'), nl,
write('||                                                                ||'), nl,
write('||                        Winner: '), write(Winner), write('!                          ||'), nl,
write('||                 Reason: '), write(Reason), write('                  ||'), nl,
write('||                                                                ||'), nl,
write('||                                                                ||'), nl,
write('||                     1. Back to Main Menu                       ||'), nl,
write('||                                                                ||'), nl,
write('||                                                                ||'), nl,
write('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'), nl.

gameOverMenu(Winner, Reason) :-
clearScreen,
gameOverScreen(Winner, Reason),
read(Option),
(
	Option =:= 1 -> mainMenu;
	
	gameOverMenu
).