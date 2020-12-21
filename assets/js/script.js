// Select start button
var startBtn = document.getElementById("button-start");
var timeEl = document.querySelector("#time");
// Call startQuiz function on button click
startBtn.onclick = startQuiz;
// Function to start quiz

var secondsLeft = 100;

function startQuiz() {
 
  var startScreen = document.querySelector("#start-screen");
  startScreen.setAttribute("class", "hide");
  startBtn.setAttribute("class", "hide");

setTime();
}



function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds ";

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}
//displsy questions
//user clicks on submit => compare user asnwers with correct answers
//user hits sumbit = timer stops(quizz ends) = create an end function and a timer event