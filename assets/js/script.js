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

//function to start the Quiz
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

//creating the questions
function setQuestion(){
  currentQuestionIndex++
  choicesEl.innerHTML = "";
  
  answer = questions[currentQuestionIndex].answer;
  var pictures = questions[currentQuestionIndex].picture;
  //Picture for every question
  var questionPics = document.createElement("img");
  questionPics.setAttribute("src", pictures);
  questionPics.setAttribute("witdth", "350");
  questionPics.setAttribute("height", "350");
  questionPics.setAttribute("class", "rounded mx-auto d-block p-3");
  choicesEl.appendChild(questionPics);

  qTitleEl.textContent = ((currentQuestionIndex + 1) + ". " + questions[currentQuestionIndex].title);
 
  var choices = questions[currentQuestionIndex].choices;
  //runing how many choices i have for the question
  for (var i = 0; i < choices.length; i++) {

  var nextChoice = document.createElement("button");
  nextChoice.textContent = choices[i];
  answerBtn = choicesEl.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn-info btn");
  }

}
//enter when click to a choice.
choicesEl.addEventListener("click", function (event) {
    
    if ((currentQuestionIndex + 1 ) < questions.length) {
      console.log(currentQuestionIndex + 1 );
      console.log(questions.length);
    // evaluation of user's answer choices & feedback
    if (answer === event.target.textContent) {   
        pElement.innerHTML = "YES!";
        rightAnswer++;
        setTimeout(hideFeedback,1225);
        showFeedback();   
        
    } else {
        pElement.innerHTML = "WRONG.";
        setTimeout(hideFeedback,1225); 
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
 //restart the screen to show the score
  finish.removeAttribute("class", "hide");
  questionsEl.setAttribute("class", "hide");
  timeEl.setAttribute("class", "hide");
  score = secondsLeft;
  clearInterval(timerInterval);
  console.log(score);

  let heading = document.createElement("h3");
  heading.setAttribute("id", "main-heading");
  heading.setAttribute("class", "p-3");
  heading.textContent = "Finished the Game.! Good Job.! Did you beat the high Score?";

  // creates elements with the instructions for the game
  let instructions = document.createElement("h3");
  instructions.setAttribute("id", "instructions");
  instructions.setAttribute("class", "p-3")
  instructions.textContent = " Your score is =  " + score; 

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
  //everytime the user type in the input
  initialsInput.addEventListener("input", function() {
    initialsInput.value = initialsInput.value.toUpperCase();
    if ( initialsInput.value.length === 3 ) { 

      //create object for this score
      let thisScore = [ { name: initialsInput.value, score: score } ]; 

      //get highscores from memory
      let storedScores = JSON.parse(localStorage.getItem("highScores")); 
     
      //if you have any
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
//to set the highscores
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
  let heading = document.createElement("h1");
  heading.setAttribute("id", "main-heading");
  heading.setAttribute("class", "display-4 p-3")
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
    //creating the back to paste the ul
    var background = document.createElement("div");
    background.setAttribute("id", "background");
    background.setAttribute("class", "d-flex flex-column");
    mainEl.appendChild(background);
    //creating the ul to add the list of hall of fame
    var lista = document.createElement("ul");
    lista.setAttribute("id", "lista");
    lista.setAttribute("class", "list-inline mx-auto justify-content-center");
    background.appendChild(lista);
    for (var i = 0; i < numScores2Display; i++) {
      var s = storedScores[i];
      var li = document.createElement("li");
      li.setAttribute("class", "font-weight-bold p-1 m-1 list-group-item-warning")
      li.textContent = (i+1) + ". " + s.name + " " + s.score;
      lista.appendChild(li);
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


//to call and clean some values
function cleanValues(){
  finish.setAttribute("class", "hide");
   currentQuestionIndex = -1;
  finish.innerHTML = "";  
}