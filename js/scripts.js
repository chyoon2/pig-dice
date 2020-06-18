function Score() {
  this.player = [];
  this.player1Cache = [];
  this.player2Cache = [];
  this.computerCache = [];
}

function diceRoll(score) {
  let value = Math.floor(Math.random() * 6) + 1;
  if (value !== 1) {
    score.player.push(value);
    addScore(score);
  } else {
    score.player.push(0)
    score.player.splice(0, score.player.length)
    alert("Turn is over")
    switchPlayer();
  }
}

  
function computerPlayer(score) {
  let roll1 = Math.floor(Math.random() * 6) + 1;
  let roll2 = Math.floor(Math.random() * 6) + 1;

  if (roll1 !== 1 && roll2 !==1 ) {
    console.log(roll1)
console.log(roll2)
    let computerRolledScore = roll1 + roll2;
    score.computerCache.push(computerRolledScore)
  }
  
  let computerSum = score.computerCache.reduce((a, b) => a + b, 0)
console.log(computerSum)
  if (computerSum >= 10) {
    alert("AI is GOD")
    
    reset();
  }
}

function hold(whichPlayer, score) {
  let cachedScore = addScore(score);
  if (whichPlayer === 1) {
    score.player1Cache.push(cachedScore);
    score.player.splice(0, score.player.length)
  } else if (whichPlayer === 2) {
    score.player2Cache.push(cachedScore);
    score.player.splice(0, score.player.length)
  }
  switchPlayer();
}

function addScore(score) {
  let sum = score.player.reduce((a, b) => a + b, 0)
  return sum;
}

function addTotalScore(whichPlayer, score) {
  if (whichPlayer === 1) {
    let totalSum = score.player1Cache.reduce((a, b) => a + b, 0)
    return totalSum
  }
  else if (whichPlayer === 2) {
    let totalSum = score.player2Cache.reduce((a, b) => a + b, 0)
    return totalSum
  }
}

function winner(whichPlayer, score) {
  let mostRecentDiceRoll = score.player[score.player.length - 1];
  if (addScore(score) >= 10) {
    alert("winner winner");
    reset();
  }
  else if (whichPlayer === 1) {
    if (parseInt(mostRecentDiceRoll + addTotalScore(1, score)) >= 10) {
      alert("winner winner");
      reset();
    }
  }
  else if (whichPlayer === 2) {
    if (parseInt(mostRecentDiceRoll + addTotalScore(2, score)) >= 10) {
      alert("winner winner");
      reset();
    }
  }
}

pigGame = {
  playerTurn: 1
  
}

function switchPlayer() {
  if (pigGame.playerTurn === 1) {
    $("#player1Button").hide();
    $("#player2Button").show();
    pigGame.playerTurn = 2;
  } else {
    $("#player1Button").show();
    $("#player2Button").hide();
    pigGame.playerTurn = 1;
  }
}

function reset() {
  $("#player1Button").hide();
  $("#player2Button").hide();
  $("#reset").show();
}

let score= new Score();
function attachlistener(score) {

  $("button#reset-button").click(function () {  //thos resets everything back 
    $("#reset").hide();
    score.player.splice(0, score.player.length)
    score.player2Cache.splice(0, score.player2Cache.length)
    score.player1Cache.splice(0, score.player1Cache.length)
    score.computerCache.splice(0, score.computerCache.length)
    $("#player1-rolled").text(0);
    $("#player1-roll").text(0);
    $("#player2-rolled").text(0);
    $("#player2-roll").text(0);
    $("#player1-points").text(0);
    $("#player2-points").text(0);
    $("#player1Button").show();
    $("#player2Button").show();
  });
}

$(document).ready(function () {

  let score = new Score();

  $("#player1-rolled").text(addScore(score));

  $('button#player1-roll').click(function (event) {
    event.preventDefault();
    diceRoll(score);
    $("#player1-rolled").text(addScore(score));
    $("#player1-roll").text(score.player[score.player.length - 1]);
    addTotalScore(1, score);
    winner(1, score);
  });

  $('button#player1-hold').click(function (event) {
    event.preventDefault();
    hold(1, score);
    addTotalScore(1, score);
    $("#player1-points").text(addTotalScore(1,score));
  });

  $('button#player2-roll').click(function (event) {
    event.preventDefault();
    diceRoll(score);
    $("#player2-rolled").text(addScore(score));
    $("#player2-roll").text(score.player[score.player.length - 1]);
    addTotalScore(2, score);
    winner(2, score);
  });

  $('button#player2-hold').click(function (event) {
    event.preventDefault();
    hold(2, score);
    addTotalScore(2, score);
    $("#player2-points").text(addTotalScore(2, score));
    computerPlayer(score);
  });
  attachlistener(score);
});