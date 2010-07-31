/*
*   Korita v0.1
*   Author: Cristobal Viedma, cristobal@viedma.es
*   Copyright (c) 2010 Cristobal Viedma
*   Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*/

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
  var valueGuess = $("result").innerHTML;
  var lengthResult = (""+valueResult).length;
  var lengthGuess = valueGuess.length;

  if (lengthResult == lengthGuess){
    if (valueGuess == valueResult){
      //Right answer      
      new Effect.Highlight('operation', {startcolor: "#00FF00"});
      setTimeout("populateOperators();", 800);
      statistics.right += 1;
      updateStatistics();
    }
    else {
      //Wrong answer
      Effect.Shake('numbers', {duration: 0.2});
      new Effect.Highlight('operation', {startcolor: "#FF0000"});
      setTimeout("clearField();", 800);
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
  $("result").innerHTML = "";
}

function clickNumber(){
  // Called when a button number is clicked
  $("result").innerHTML += this.value;
  checkGuess();
}

Event.observe(window, 'load', function() {
  populateOperators();
  
  //Observers for the numbers
  $$(".number").each(function(num){num.observe('click', clickNumber);});

  Event.observe($("clear"), 'click', clearField);
  Event.observe($("new"), 'click', populateOperators);
});

