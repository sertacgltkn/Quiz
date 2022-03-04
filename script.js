function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

// Question prototype

Question.prototype.checkAnswer = function (answer) {
  return this.answer === answer;
};

//Quiz Constructor

function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionsIndex = 0;
}

// Quize Prototype

Quiz.prototype.getQuestion = function () {
  return this.questions[this.questionsIndex];
};

//Quiz isFinish

Quiz.prototype.isFinish = function () {
  return this.questions.length === this.questionsIndex;
};

// Quiz Guess

Quiz.prototype.guess = function (answer) {
  var question = this.getQuestion();

  if (question.checkAnswer(answer)) {
    this.score++;
  }
  this.questionsIndex++;
};

var q1 = new Question(
  "Avustralya'nın başkenti hangisidir?",
  ["Sydney", "Melbourne", "Brisbane", "Canberra"],
  "Canberra"
);

var q2 = new Question(
  "Türkiye'nin başkenti hangisidir?",
  ["Ankara", "Izmir", "Istanbul", "Antalya"],
  "Ankara"
);

var q3 = new Question(
  "İspanya'nın  başkenti hangisidir",
  ["Madrid", "Barcelona", "Valencia", "Malaga"],
  "Madrid"
);

var questions = [q1, q2, q3];

//Start Quiz

var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
  if (quiz.isFinish()) {
    showScore();
  } else {
    var question = quiz.getQuestion();
    var choices = question.choices;

    document.querySelector("#question").textContent = question.text;

    for (var i = 0; i < choices.length; i++) {
      var element = document.querySelector("#choice" + i);
      element.innerHTML = choices[i];

      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function guess(id, guess) {
  var btn = document.getElementById(id);
  btn.onclick = function () {
    quiz.guess(guess);
    loadQuestion();
  };
}

function showScore() {
  var html = `<h2>Puan </h2> <h4>${quiz.score}</h4>`;
  document.querySelector(".card-body").innerHTML = html;
}

function showProgress() {
  var totalQuestion = quiz.questions.length;

  var questionNumber = quiz.questionsIndex + 1;
  document.querySelector("#progress").innerHTML =
    "Soru " + questionNumber + " / " + totalQuestion;
}
