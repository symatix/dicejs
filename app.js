/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, globalScore, activePlayer, activeGame, sixCounter;
var diceDOM = document.querySelector('.dice');
var scoreSet = document.getElementById('score-set');
scoreSet.textContent = 100;
init();

function init(){
	activeGame = true;
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	sixCounter = 0;


	document.getElementById('diceOne').style.display = 'none';
	document.getElementById('diceTwo').style.display = 'none';

	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');
	resetDashboard();
}

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	sixCounter = 0;
	document.getElementById('diceOne').style.display = 'none';
	document.getElementById('diceTwo').style.display = 'none';
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}
function diceDisplay(diceOne,diceTwo){
			document.getElementById('diceOne').style.display = 'block';
			document.getElementById('diceTwo').style.display = 'block';
			document.getElementById('diceOne').src = 'dice-'+diceOne+'.png';
			document.getElementById('diceTwo').src = 'dice-'+diceTwo+'.png';
}
function resetDashboard(){
	document.getElementById('reason-0').innerHTML = '&nbsp';
	document.getElementById('reason-1').innerHTML = '&nbsp';
}

document.querySelector('.btn-roll').addEventListener('click', function(){
	if (activeGame){
		resetDashboard();

		// generate random number and display dice
		var diceOne = Math.floor(Math.random()*6+1);
		var diceTwo = Math.floor(Math.random()*6+1);

		if (diceOne === 1 || diceTwo === 1){
			diceDisplay(diceOne,diceTwo);
			document.getElementById('reason-'+activePlayer).textContent = 'You got a 1.'
			nextPlayer();
		// passing result
		} else if (diceOne === 6 && diceTwo === 6){
			document.getElementById('reason-'+activePlayer).textContent = 'You got double 6.'
			scores[activePlayer] = 0;
			document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
			nextPlayer();

		
		} else if (diceOne === 6 || diceTwo === 6){
			diceDisplay(diceOne,diceTwo);
			sixCounter++;
			if (sixCounter === 2){
				document.getElementById('reason-'+activePlayer).textContent = 'You got two 6 in a row.'
				scores[activePlayer] = 0;
				document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
				nextPlayer();
			} else {
				diceDisplay(diceOne,diceTwo);
				roundScore += (diceOne + diceTwo);
				document.getElementById('current-'+activePlayer).textContent = roundScore;	
			}
		} else {
			sixCounter = 0;
			roundScore += (diceOne + diceTwo);
			document.getElementById('current-'+activePlayer).textContent = roundScore;	
			diceDisplay(diceOne,diceTwo);
		}
	}
})

document.querySelector('.btn-hold').addEventListener('click', function(){
	if (activeGame){
		scores[activePlayer] += roundScore;
		document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

		var winningScore;
		var finalScore = document.getElementById('score-set').textContent;

		winningScore = Number(finalScore);

		if (scores[activePlayer] >= winningScore){
			document.getElementById('name-'+activePlayer).textContent = 'Winner!';
			document.getElementById('diceOne').style.display = 'none';
			document.getElementById('diceTwo').style.display = 'none';
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');

			document.getElementById('reason-'+activePlayer).innerHTML = '<i class="ion-trophy"></i>';
			activeGame = false;
		} else {
			nextPlayer();
		}
	}
})
document.getElementById('winning-score').addEventListener('change',function(){
	var finalScore = document.getElementById('winning-score').value;
	if (finalScore){
		scoreSet.textContent = finalScore;
		document.getElementById('winning-score').value = "";
		init();
		resetDashboard();
	} else {
		scoreSet.textContent = 100;
	}

})


// new game
document.querySelector('.btn-new').addEventListener('click',function(){
	scoreSet.textContent = 100;
	init();
});