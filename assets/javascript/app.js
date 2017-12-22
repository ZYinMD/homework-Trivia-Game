var currentQuestionNumber;
var score;
initialize();

function initialize() {
  $('#question').on('click', '[id]', isCorrect);
  $('#start-button').on('click', function() {
    newGame(120);
  });
  $('#play-again').on('click', function() {
    newGame(10);
  });
}

function newGame(seconds) {
  currentQuestionNumber = 0;
  score = 0;
  $('.announcements > *').toggleClass('hidden', true);
  $('#start-button').toggleClass('hidden', true);
  countdown(seconds);
  populateQuestion();
}

function countdown(seconds) {
  var timerDiv = $('#timer');
  timerDiv.text('Time Left: ' + Math.floor(seconds / 60) + 'm' + seconds % 60 + 's'); //First do it once manually, because setInverval only run the function immediately
  intervalId = setInterval(function() {
    if (--seconds == 0) {
      gameOver();
    }
    timerDiv.text('Time Left: ' + Math.floor(seconds / 60) + 'm' + seconds % 60 + 's');
  }, 1000)
  timerDiv.toggleClass('hidden', false);
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
  clearInterval(intervalId);
  $('#question > *').empty()
  $('#score').toggleClass('hidden', false).html('Score: ' + score / questions.length * 100 + '%');
  $('#play-again').toggleClass('hidden', false);
}
