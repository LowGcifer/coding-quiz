var startButton = document.getElementById("start-btn");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");

var shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  console.log(currentQuestionIndex);
  if (currentQuestionIndex === questions.length) {
    endGame();
  } else {
    setNextQuestion();
  }
});

function startGame() {
  startButton.classList.add("hide");
  nextButton.classList.remove("hide");
  console.log("Let the Quiz begin!");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
  countdown();
}

function setNextQuestion(event) {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  if (shuffledQuestions.length === currentQuestionIndex) {
  }
  return;
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.Element.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  // nextButton.classList.add("hide");
  // while (answerButtonsElement.firstChild) {
  //   answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  // }
}

function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions > currentQuestionIndex) {
    showQuestion(questions);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function endGame() {
  console.log("Game ending");
  nextButton.disabled = true;
  var initials = prompt("Type in your initials!!!");
  localStorage.setItem("Leaderboard:", JSON.stringify(initials));
}

var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("last-high-score");

function countdown() {
  var secondsLeft = 60;

  var timeInterval = setInterval(function () {
    if (secondsLeft >= 1) {
      timeEl.textContent = secondsLeft + " seconds remaining.";
      secondsLeft--;
    } else {
      timeEl.textContent = "Time out!";
      clearInterval(timeInterval);
    }
  }, 1000);
}

var questions = [
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheet", correct: true },
      { text: "Cascading Sheet of Styles", correct: false },
      { text: "Circading Sleeping Sheets", correct: false },
      { text: "Common Style Sheet", correct: false },
    ],
  },
];
