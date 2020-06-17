function Score () {
  this.player = [];
  this.player1Cache = [];
  this.player2Cache = [];
}

let pigGame = {
  player1Score
}

function diceRoll(player) {
  let value = Math.floor( Math.random() * 6 ) +1;
  if (value !== 1){
console.log(value);
    score.player.push(value);
    addScore();
  } else {
    score.player.push(0)
    score.player.splice(0, score.player.length)
    alert ("Turn is over")
  }
}

function hold() {
  let cachedScore = addScore();
  score.player1Cache.push(cachedScore);
  score.player.splice(0, score.player.length);
}

function addScore() {
  let sum =score.player.reduce((a, b) => a + b, 0)
console.log("sum"+sum);
  return sum;
}

function addTotalScore() {
  let totalSum =score.player1Cache.reduce((a, b) => a + b, 0)
console.log("totalsum"+totalSum);
  return totalSum
}

function winner() {
  let mostRecentDiceRoll = score.player[score.player.length-1];
  if (addScore() >= 10) {
    alert ("winner winner");
  } else if (parseInt(mostRecentDiceRoll + addTotalScore()) >= 10){
    alert ("winner winner");
  }
}

let score = new Score ();

$(document).ready(function() {
  $('button#player1-roll').click(function(event) {
    event.preventDefault();
    diceRoll();
    $("#player1-rolled").text(addScore());
    $("#player1-roll").text(score.player[score.player.length-1]);
    addTotalScore();
    winner ();
  });

  $('button#player1-hold').click(function(event) {
    event.preventDefault();
    hold();
    addTotalScore();
    $("#player1-points").text(addTotalScore());
  });
});
