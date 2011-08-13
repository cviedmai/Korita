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
  var n = Math.floor(Math.random()*range);
  if (n == 0)
    return generateNumber(range);
  else
    return n
}

function populateOperators(){
  $("#operation").removeClass("right");
  var op1 = generateNumber(100);
  var op2 = generateNumber(10);

  $("#op1").text(op1);
  $("#op2").text(op2);
  $("#operator").text("x");
  valueResult = op1*op2;
  clearField();
}

function checkGuess(){
  // Checks if the input button is correct
  var valueGuess = $("#result").text();
  var lengthResult = (""+valueResult).length;
  var lengthGuess = valueGuess.length;

  if (lengthResult == lengthGuess){
    if (valueGuess == valueResult){
      //Right answer      
      $("#operation").addClass("right");
      setTimeout("populateOperators();", 800);
      statistics.right += 1;
      updateStatistics();
    }
    else {
      //Wrong answer
      $("#operation").addClass("wrong");
      setTimeout("clearField();", 800);
      statistics.wrong += 1;
      updateStatistics();
    }
  }
}

function updateStatistics(){
  $("#rightAnswers").text(statistics.right);
  $("#wrongAnswers").text(statistics.wrong);
}


function clearField(){
  $("#operation").removeClass("wrong");
  $("#result").text("");
}

function clickNumber(){
  // Called when a button button is clicked
  $("#result").text($("#result").text() + this.value);
  checkGuess();
}

$(window).ready(function() {
  populateOperators();
  
  //Observers for the buttons
  $(".number").each(function(index){$(this).bind('click', clickNumber);});

  $("#clear").bind('click', clearField);
  $("#new").bind( 'click', populateOperators);
});

