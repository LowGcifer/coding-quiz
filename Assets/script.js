var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainer = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
)

var shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame)

function startGame() {
    console.log('Game has Started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(()=> Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
questionElement.innerText = question.question;
question.answers.forEach(answer => {
    var button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn')
    if (answer.correct) {

    }
    button.addEventListener.Listener('click', selectAnswer)
    answerButtons.Element.appendChild(button)
})
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
   var selectedButton = e.target;
   var correct = selectedButton.dataset.correct;
   setStatusClass(document.body, correct);
   Array.from(answerButtonsElement.children).forEach(button => {
       setStatusClass(button,button.dataset.correct);
   })
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

var questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: 'Cascading Style Sheet', correct: true},
            { text: 'Cascading Sheet of Styles', correct: false},
            { text: 'Circading Sleeping Sheets', correct: false},
            { text: 'Common Style Sheet', correct: false},
        ]
    }
]