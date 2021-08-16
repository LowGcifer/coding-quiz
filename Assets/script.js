var startButton = document.getElementById("start-btn");
var questionContainer = document.getElementById("container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var scoreElement = document.getElementById("score");
var finalScore = 0;

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
  questionContainer.classList.remove("hide");
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

function showQuestion(questions) {
  questionElement.textContent = questions.question;
  questions.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.textContent = answers.text;
    button.classList.add("btn", "btn-primary", "btn-custom");
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
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
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
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
    finalScore += 100;
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
  nextButton.classList.add("hide");
  // scoreElement.classList.remove("hide");
  scoreElement.textContent = `Your score is: ${finalScore}`;
  questionContainer.classList.add("hide");
  var initials = prompt("Type in your initials!!!");
  localStorage.setItem("Leaderboard:", JSON.stringify(initials));
}

var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("last-high-score");

function countdown() {
  var secondsLeft = 30;

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
  {
    question: "Where does CSS go in HTML?",
    answers: [
      { text: "<script>", correct: false },
      { text: "<div>", correct: false },
      { text: "<link>", correct: true },
      { text: "<stylesheet>", correct: false },
    ],
  },
  {
    question: "How do we capitalize letters in JavaScript?",
    answers: [
      { text: "fUnNyCaSe", correct: false },
      { text: "camelCase", correct: true },
      { text: "lowercase", correct: false },
      { text: "UpperCase", correct: false },
    ],
  },
  {
    question: "How do we denote that we are targeting a class in CSS?",
    answers: [
      { text: "*", correct: false },
      { text: "No mark", correct: false },
      { text: "#", correct: false },
      { text: ".", correct: true },
    ],
  },
];
