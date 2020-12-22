// Select start button
var highscoreLink = document.querySelector("#highscore");
var startBtn = document.getElementById("button-start");
var timeEl = document.querySelector("#time");
let mainEl = document.querySelector("#finish");
var questionsEl = document.querySelector("#questions");
// Call startQuiz function on button click
startBtn.onclick = startQuiz;
// Function to start quiz
var qTitleEl = document.querySelector("#question-tittle");
var choicesEl = document.querySelector("#choices");
var currentQuestionIndex =-1;
var answer;
var secondsLeft = 100;
var rightAnswer =0;
var pElement = document.querySelector(".wrongOrRight")
var startScreen = document.querySelector("#start-screen");
var timerInterval;
var Initials = "";
var score;
var quizType = "";
highscoreLink.addEventListener("click", getHighScores);
let qPicturesEl = document.querySelector("#question-pics");

function startQuiz() {
  cleanValues();
  startScreen.setAttribute("class", "hide");
  startBtn.setAttribute("class", "hide");
  questionsEl.removeAttribute("class", "hide");
  setTime();
  setQuestion();
   
}



function setTime() {
  timeEl.removeAttribute("class", "hide");
  secondsLeft = 100;
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds ";

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      alert("!!Time is Over.!!!");
      yourScore();
    }
  }, 1000);
}


function setQuestion(){
  currentQuestionIndex++
  choicesEl.innerHTML = "";
  answer = questions[currentQuestionIndex].answer;
 
  qPicturesEl.setAttribute("src", "./assets/img/question" + (currentQuestionIndex + 1 + ".jpg"));
  qTitleEl.textContent = ((currentQuestionIndex + 1) + ". " + questions[currentQuestionIndex].title);
 
  var choices = questions[currentQuestionIndex].choices;

  for (var i = 0; i < choices.length; i++) {

  var nextChoice = document.createElement("button");
  nextChoice.textContent = choices[i];
  answerBtn = choicesEl.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn-info btn");
  }

}




choicesEl.addEventListener("click", function (event) {
    
    if ((currentQuestionIndex + 1 ) < questions.length) {
      console.log(currentQuestionIndex + 1 );
      console.log(questions.length);
    // evaluation of user's answer choices & feedback
    if (answer === event.target.textContent) {   
        pElement.innerHTML = "YES!";
        rightAnswer++;
        setTimeout(hideFeedback,1225);
        // setTimeout(dhighLight,1225);
        // highLight(event.target,true);
        showFeedback();   
        
    } else {
        pElement.innerHTML = "WRONG.";
        setTimeout(hideFeedback,1225);
        // setTimeout(dhighLight,1225);
        // highLight(event.target, false);
        secondsLeft = secondsLeft - 10;
        showFeedback();
    }    
    setQuestion();
  }
  else{
    yourScore();
  }
});

function hideFeedback(){
  pElement.setAttribute("class", "hide");
}

function showFeedback(){
  pElement.removeAttribute("class");
}

function yourScore(){
 
  finish.removeAttribute("class", "hide");
  questionsEl.setAttribute("class", "hide");
  timeEl.setAttribute("class", "hide");
  score = secondsLeft;
  clearInterval(timerInterval);
  console.log(score);

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Finished the Game.! Good Job.! Did you beat the high Score?";

  // creates elements with the instructions for the game
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Your score is " + score; 

  // creates button to start the game
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Play again";

  // creates input for user to add initials
  let par = document.createElement("p");

  let initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for","userInitials");
  initialsLabel.textContent = "Enter Initials: ";

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id","userInitials");
  initialsInput.setAttribute("name","userInitials");
  initialsInput.setAttribute("minlength","3");
  initialsInput.setAttribute("maxlength","3");
  initialsInput.setAttribute("size","3");


  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(initialsLabel);
  mainEl.appendChild(initialsInput);
  mainEl.appendChild(par);
  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", function(){
    startQuiz(); 
  });

  initialsInput.addEventListener("input", function() {
    initialsInput.value = initialsInput.value.toUpperCase();
    if ( initialsInput.value.length === 3 ) { 

      //create object for this score
      let thisScore = [ { name: initialsInput.value, score: score } ]; 

      //get highscores from memory
      let storedScores = JSON.parse(localStorage.getItem("highScores")); 
     

      if (storedScores !== null) { 
        storedScores.push(thisScore[0]); 
      } else {
        storedScores = thisScore;
      }

      localStorage.setItem("highScores", JSON.stringify(storedScores));
      finish.innerHTML = "";
      getHighScores();
    }
  });
}

function getHighScores(){
  startScreen.setAttribute("class", "hide");
  startBtn.setAttribute("class", "hide");
  mainEl.innerHTML = "";
  mainEl.removeAttribute("class", "hide");
  questionsEl.setAttribute("class", "hide");
  clearInterval(timerInterval);
   timeEl.setAttribute("class", "hide");
  

  

  let storedScores = JSON.parse(localStorage.getItem("highScores")); 

  // draw heading
  let heading = document.createElement("h2");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Top 5 High Score Hall of Fame";

  mainEl.appendChild(heading);

  
  // TODO check for this error 
  if ( storedScores !== null ) {
    // sort scores
    storedScores.sort((a,b) => (a.score < b.score) ? 1: -1);

    // sets the number of scores to display to 5 or the number of games played. Which ever is less
    let numScores2Display = 5;
    if ( storedScores.length < 5 ) { 
      numScores2Display = storedScores.length; 
    }

    for (var i = 0; i < numScores2Display; i++) {
      var s = storedScores[i];

      var p = document.createElement("p");
      p.textContent = s.name + " " + s.score;
      mainEl.appendChild(p);
    }
  } else {
    var p = document.createElement("p");
    p.textContent =  "Your Initials Here!"
    mainEl.appendChild(p);
  }


  // creates button to start the game
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Play!";

  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", startQuiz);
}



function cleanValues(){
  finish.setAttribute("class", "hide");
   currentQuestionIndex = -1;
  finish.innerHTML = "";  
}