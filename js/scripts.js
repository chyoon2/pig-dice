function Score() {
  this.player = [];
  this.player1Cache = [];
  this.player2Cache = [];
}


function diceRoll() {
  let value = Math.floor(Math.random() * 6) + 1;
  if (value !== 1) {
    score.player.push(value);
    addScore();
  } else {
    score.player.push(0)
    score.player.splice(0, score.player.length)
    alert("Turn is over")
    switchPlayer();
  }
}

function hold(whichPlayer) {
  let cachedScore = addScore();
  if (whichPlayer === 1) {
    score.player1Cache.push(cachedScore);
    score.player.splice(0, score.player.length)
  } else if (whichPlayer === 2) {
    score.player2Cache.push(cachedScore);
    score.player.splice(0, score.player.length)
  }
  switchPlayer();
}

function addScore() {
  let sum = score.player.reduce((a, b) => a + b, 0)
  return sum;
}

function addTotalScore(whichPlayer) {
  if (whichPlayer === 1) {
    let totalSum = score.player1Cache.reduce((a, b) => a + b, 0)
    return totalSum
  }
  else if (whichPlayer === 2) {
    let totalSum = score.player2Cache.reduce((a, b) => a + b, 0)
    return totalSum
  }
}

function winner(whichPlayer) {
  let mostRecentDiceRoll = score.player[score.player.length - 1];
  if (addScore() >= 10) {
    alert("winner winner");
    reset();
  }
  else if (whichPlayer === 1) {
    if (parseInt(mostRecentDiceRoll + addTotalScore(1)) >= 10) {
      alert("winner winner");
      reset();
    }
  }
  else if (whichPlayer === 2) {
    if (parseInt(mostRecentDiceRoll + addTotalScore(2)) >= 10) {
      alert("winner winner");
      reset();
    }
  }
}

pigGame = {
  playerTurn: 1
  player1 =1,
  player2 = 2,
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

let score = new Score();

function attachlistener() {
  $("button#reset-button").click(function () {  //thos resets everything back 
    $("#reset").hide();
    score.player.splice(0, score.player.length)
    score.player2Cache.splice(0, score.player2Cache.length)
    score.player1Cache.splice(0, score.player1Cache.length)
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
  $('button#player1-roll').click(function (event) {
    event.preventDefault();
    diceRoll();
    $("#player1-rolled").text(addScore());
    $("#player1-roll").text(score.player[score.player.length - 1]);
    addTotalScore(1);
    winner(1);
  });

  $('button#player1-hold').click(function (event) {
    event.preventDefault();
    hold(1);
    addTotalScore(1);
    $("#player1-points").text(addTotalScore(1));
  });

  $('button#player2-roll').click(function (event) {
    event.preventDefault();
    diceRoll();
    $("#player2-rolled").text(addScore());
    $("#player2-roll").text(score.player[score.player.length - 1]);
    addTotalScore(2);
    winner(2);
  });

  $('button#player2-hold').click(function (event) {
    event.preventDefault();
    hold(2);
    addTotalScore(2);
    $("#player2-points").text(addTotalScore(2));
  });
  attachlistener();
});