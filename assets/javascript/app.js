var currentQuestionNumber;
var score;

function initialize() {
  $('#question').on('click', '[id]', isCorrect);
}
initialize();
newGame();

function newGame() {
  currentQuestionNumber = 0;
  score = 0;
  countdown(120);
  populateQuestion();
}

function countdown(seconds) {
  var timerDiv= $('<div>');
  $('.announcements').append(timerDiv);
  intervalId=setInterval(function() {
    timerDiv.text(Math.floor(seconds/60)+'m'+seconds%60+'s');
    if (--seconds < 110) {
      clearInterval(intervalId);
      gameOver();
    }
  }, 1000)
}

function populateQuestion() {
  currentQuestion = questions[currentQuestionNumber];
  $('#stem').text(currentQuestion.stem);
  $('#a').text('A. ' + currentQuestion.a);
  $('#b').text('B. ' + currentQuestion.b);
  $('#c').text('C. ' + currentQuestion.c);
  $('#d').text('D. ' + currentQuestion.d);
}

function isCorrect() {
  var key = currentQuestion.correctChoice;
  var picked = $(this).attr('id');
  $('#' + key).append('<span style="color: LightGreen"> ✔</span>'); //mark the correct answer no matter what
  if (picked == key) {
    score++;
  } else {
    $('#' + picked).append('<span style="color: red"> ✖</span>');
  }
  setTimeout(nextQuestion, 1250);
}

function nextQuestion() {
  if (currentQuestionNumber == questions.length - 1) {
    gameOver();
  } else {
    currentQuestionNumber++;
    populateQuestion();
  }
}

function gameOver() {
  var scoreInPercent = score / questions.length * 100 + '%';
  $('#question').html('score: ' + scoreInPercent);
}
