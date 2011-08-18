/*
*   Korita v0.1
*   Author: Cristobal Viedma, cristobal@viedma.es
*   Copyright (c) 2010 Cristobal Viedma
*   Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*/

var valueResult;
var lengthResult;
var statistics = {right: 0, wrong:0};
var resultElem;
var op1Elem;
var op2Elem;
var operatorElem;
var operationElem;
var rightElem;
var wrongElem;

function generateNumber(range){
  var n = Math.floor(Math.random()*range);
  if (n == 0)
    return generateNumber(range);
  else
    return n
}

function populateOperators(){
  operationElem.removeClass("right");
  var op1 = generateNumber(100);
  var op2 = generateNumber(10);

  op1Elem.text(op1);
  op2Elem.text(op2);
  operatorElem.text("x");
  valueResult = op1*op2;
  lengthResult = (""+valueResult).length;
  clearField();
}

function checkGuess(){
  // Checks if the input button is correct
  var valueGuess = resultElem.text();
  var lengthGuess = valueGuess.length;

  if (lengthResult == lengthGuess){
    if (valueGuess == valueResult){
      //Right answer      
      operationElem.addClass("right");
      setTimeout("populateOperators();", 800);
      statistics.right += 1;
      updateStatistics();
    }
    else {
      //Wrong answer
      operationElem.addClass("wrong");
      setTimeout("clearField();", 800);
      statistics.wrong += 1;
      updateStatistics();
    }
  }
}

function updateStatistics(){
  rightElem.text(statistics.right);
  wrongElem.text(statistics.wrong);
}


function clearField(){
  operationElem.removeClass("wrong");
  resultElem.text("");
}

function clickNumber(){
  // Called when a button button is clicked
  resultElem.text(resultElem.text() + this.value);
  checkGuess();
}

$(window).ready(function() {
  
  resultElem = $("#result");
  op1Elem = $("#op1");
  op2Elem = $("#op2");
  operatorElem = $("#operator");
  operationElem = $("#operation");
  rightElem = $("#rightAnswers");
  wrongElem = $("#wrongAnswers");

  populateOperators();
  
  //Observers for the buttons
  $(".number").each(function(index){$(this).bind('click', clickNumber);});

  $("#clear").bind('click', clearField);
  $("#new").bind( 'click', populateOperators);
});

