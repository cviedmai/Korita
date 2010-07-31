var valueResult;
var statistics = {right: 0, wrong:0};

function generateNumber(range){
  return Math.floor(Math.random()*range);
}

function populateOperators(){
  var op1 = generateNumber(100);
  var op2 = generateNumber(10);

  $("op1").innerHTML = op1;
  $("op2").innerHTML = op2;
  $("operator").innerHTML = "x";
  valueResult = op1*op2;
  clearField();
}

function checkGuess(){
  // Checks if the input number is correct
  var valueGuess = $("guessField").value;
  var lengthResult = (""+valueResult).length;
  var lengthGuess = valueGuess.length;

  if (lengthResult == lengthGuess){
    if (valueGuess == valueResult){
      //Right answer      
      //Effect.Pulsate('guessField', {duration: 0.5});
      new Effect.Highlight('guessField', {startcolor: "#00FF00"});
      setTimeout("populateOperators();", 500);
      statistics.right += 1;
      updateStatistics();
    }
    else {
      //Wrong answer
      Effect.Shake('numbers', {duration: 0.2});
      new Effect.Highlight('guessField', {startcolor: "#FF0000"});
      setTimeout("clearField();", 500);
      statistics.wrong += 1;
      updateStatistics();
    }
  }
}

function updateStatistics(){
  $("rightAnswers").innerHTML = statistics.right;
  $("wrongAnswers").innerHTML = statistics.wrong;
}


function clearField(){
  $("guessField").value = "";
}

Event.observe(window, 'load', function() {
  populateOperators();
  
  //Observers for the numbers
  $$(".number").each(function(num){
    num.observe('click', function(event) {
      $("guessField").value += this.value;
      checkGuess();
    });
  });

  Event.observe($("clear"), 'click', clearField);
  Event.observe($("new"), 'click', populateOperators);
});

