function Score () {
  this.player = [];
  this.player1Cache = [];
}

function diceRoll(player) {
  let value = Math.floor( Math.random() * 6 ) +1;
  if (value !== 1){
console.log(value);
    score.player.push(value);
    addscore();
  } else {
    score.player.push(0)
    score.player.splice(0, score.player.length)
    alert ("YA DONE 1")
  }
}

function hold() {
  let cachedScore = addscore();
  score.player1Cache.push(cachedScore);
  score.player.splice(0, score.player.length);
  addTotalScore();
}

function addscore() {
  let sum =score.player.reduce((a, b) => a + b, 0)
console.log("sum"+sum);
  return sum;
}

function addTotalScore() {
  let totalSum =score.player1Cache.reduce((a, b) => a + b, 0)
    if (parseInt(totalSum)>=10){
      alert ("you win")
    }
    console.log("totalsum"+totalSum);
}

//   // total points show
//     += score.player1[score.player1.length-1]

let score = new Score ();

$(document).ready(function() {
  $('button#player1-roll').click(function(event) {
    event.preventDefault();
    diceRoll();
  });

  $('button#player1-hold').click(function(event) {
    event.preventDefault();
    hold();
  });
});
